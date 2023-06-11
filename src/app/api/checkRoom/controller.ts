import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const checkRoom = { get, getById, create, update, remove };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnCheckRooms = ThenArg<ReturnType<typeof checkRoom.get>>;
export type ReturnCheckRoom = ThenArg<ReturnType<typeof checkRoom.getById>>;
export type ReturnCheckRoomCreate = ThenArg<
  ReturnType<typeof checkRoom.create>
>;
export type ReturnCheckRoomUpdate = ThenArg<
  ReturnType<typeof checkRoom.update>
>;
export type ReturnCheckRoomDelete = ThenArg<
  ReturnType<typeof checkRoom.remove>
>;
export type RequestBodyCreate = {
  date?: string;
  term: number;
  time: number;
  isPass: boolean;
  roomId: number;
  year: number;
  checkStudent: { userId: number; isPass: boolean }[];
};
export type RequestBodyUpdate = Omit<RequestBodyCreate, "id" | "year">;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.CheckRoomArgs>()({
  include: {
    room: { include: { department: true } },
    checkStudent: {
      select: {
        user: {
          select: {
            id: true,
            email: true,
            f_name: true,
            l_name: true,
            type: true,
          },
        },
        isPass: true,
        id: true,
      },
    },
  },
});

async function get() {
  const result = await prisma.checkRoom.findMany({
    ...select_include,
  });
  return result;
}

async function getById(id: number) {
  const result = await prisma.checkRoom.findFirst({
    where: { id: +id },
    ...select_include,
  });
  return result;
}

async function create(request: Request) {
  const body: RequestBodyCreate = await request.json();

  const result = await prisma.checkRoom.create({
    data: {
      date: body?.date || new Date(),
      term: body?.term,
      time: body?.time,
      isPass: body?.isPass,
      roomId: body?.roomId,
      year: body?.year,
      checkStudent: {
        createMany: {
          data: body?.checkStudent?.map((item) => ({
            userId: item.userId,
            isPass: item.isPass,
          })),
        },
      },
    },
  });

  return result;
}

async function update(request: Request, id: number) {
  const body: RequestBodyUpdate = await request.json();

  const result = await prisma.checkRoom.update({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
    data: {
      date: body?.date || new Date(),
      term: body?.term,
      time: body?.time,
      isPass: body?.isPass,
      roomId: body?.roomId,
      checkStudent: {
        update: body?.checkStudent?.map((item) => ({
          where: {
            checkRoomId_userId: {
              checkRoomId: +id,
              userId: item.userId,
            },
          },
          data: { isPass: item.isPass },
        })),
      },
    },
    ...select_include,
  });

  return result;
}

async function remove(id: number) {
  const result = await prisma.checkRoom.delete({
    where: { id: +id },
    ...select_include,
  });

  return result;
}
