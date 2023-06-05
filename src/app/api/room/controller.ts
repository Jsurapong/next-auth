import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

import { verifyJwt } from "@/lib/jwt";

export const room = { get, getById, create, update, remove };

import { Role } from "@/lib/types/role";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnRooms = ThenArg<ReturnType<typeof room.get>>;
export type ReturnRoom = ThenArg<ReturnType<typeof room.getById>>;
export type ReturnRoomCreate = ThenArg<ReturnType<typeof room.create>>;
export type ReturnRoomUpdate = ThenArg<ReturnType<typeof room.update>>;
export type ReturnRoomDelete = ThenArg<ReturnType<typeof room.remove>>;
export type RequestBodyCreate = {
  name: string;
  teacherId: number;
  departmentId: number;
  term: number;
  year: number;
  users: number[];
};
export type RequestBodyUpdate = RequestBodyCreate;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.RoomArgs>()({
  include: { department: true, user: true },
});

async function get(request: Request) {
  const accessToken = request.headers.get("authorization");

  const jwtDecode = verifyJwt(accessToken!);

  let where = {};
  if (jwtDecode?.type === Role.TeacherL2) {
    where = { teacherId: +jwtDecode?.id };
  }

  const rooms = await prisma.room.findMany({
    where,
    ...select_include,
  });
  return rooms;
}

async function getById(id: number) {
  const room = await prisma.room.findFirst({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
    ...select_include,
  });

  return room;
}

async function create(request: Request) {
  const body: RequestBodyCreate = await request.json();

  const result = await prisma.room.create({
    data: {
      name: body?.name,
      departmentId: body?.departmentId,
      teacherId: body?.teacherId,
      date: new Date(),
      term: body?.term,
      year: body?.year,
    },
    ...select_include,
  });

  const roomId = result.id;

  const updateUser = body?.users?.map(
    async (id) =>
      await prisma.user.update({
        where: { id: id },
        data: { roomId: roomId },
      })
  );

  await Promise.all(updateUser);

  const resultWithUsers = getById(roomId);

  return resultWithUsers;
}

async function update(request: Request, roomId: number) {
  const body: RequestBodyUpdate = await request.json();

  const result = await prisma.room.update({
    where: { id: +roomId }, // convert string to number add "+" prefix "params.id"
    data: {
      name: body?.name,
      departmentId: body?.departmentId,
      teacherId: body?.teacherId,
      date: new Date(),
      term: body?.term,
      year: body?.year,
    },
    ...select_include,
  });

  const clearRoomId = result?.user?.map(
    async (item) =>
      await prisma.user.update({
        where: { id: item.id },
        data: { roomId: null },
      })
  );

  await Promise.all(clearRoomId);

  const updateUser = body?.users?.map(
    async (id) =>
      await prisma.user.update({
        where: { id: id },
        data: { roomId: roomId },
      })
  );

  await Promise.all(updateUser);

  return result;
}

async function remove(id: number) {
  const room = await prisma.room.delete({
    where: { id: +id },
    ...select_include,
  });

  return room;
}
