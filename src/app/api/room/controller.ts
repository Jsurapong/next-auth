import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export const room = { get, getById, create, update, remove };

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
  date: string;
};
export type RequestBodyUpdate = RequestBodyCreate;

// ============= Action Prisma ==================

const select_include: Prisma.RoomArgs = {};

async function get() {
  const rooms = await prisma.room.findMany({});
  return rooms;
}

async function getById(id: number) {
  const room = await prisma.room.findFirst({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
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
      date: body?.date,
      term: body?.term,
    },
  });

  return result;
}

async function update(request: Request, id: number) {
  const body: RequestBodyUpdate = await request.json();

  const room = await prisma.room.update({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
    data: {
      name: body?.name,
      departmentId: body?.departmentId,
      teacherId: body?.teacherId,
      date: body?.date,
      term: body?.term,
    },
  });

  return room;
}

async function remove(id: number) {
  const room = await prisma.room.delete({
    where: { id: +id },
  });

  return room;
}
