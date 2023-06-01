import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export const user = { get, getById, create, update, remove };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnUsers = ThenArg<ReturnType<typeof user.get>>;
export type ReturnUser = ThenArg<ReturnType<typeof user.getById>>;
export type ReturnUserCreate = ThenArg<ReturnType<typeof user.create>>;
export type ReturnUserUpdate = ThenArg<ReturnType<typeof user.update>>;
export type ReturnUserDelete = ThenArg<ReturnType<typeof user.remove>>;
export type RequestBodyCreate = {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  type: number;
  info?: string;
  roomId: number;
};
export type RequestBodyUpdate = Omit<RequestBodyCreate, "id">;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    f_name: true,
    l_name: true,
    password: false,
    type: true,
    info: false,
    roomId: true,
    deleted: false,
  },
});

async function get() {
  const users = await prisma.user.findMany({
    ...select_include,
  });
  return users;
}

async function getById(id: number) {
  const users = await prisma.user.findFirst({
    where: { id: +id },
    ...select_include,
  });
  return users;
}

async function create(request: Request) {
  const body: RequestBodyCreate = await request.json();

  const user = await prisma.user.create({
    data: {
      id: +body?.id,
      f_name: body?.f_name,
      l_name: body?.l_name,
      email: body?.email,
      password: await bcrypt.hash(body.password, 10),
      type: body?.type ?? undefined,
      info: body?.info,
      roomId: body?.roomId ?? undefined,
    },
    ...select_include,
  });

  return user;
}

async function update(request: Request, id: number) {
  const body: RequestBodyUpdate = await request.json();

  const user = await prisma.user.update({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
    data: {
      f_name: body?.f_name,
      l_name: body?.l_name,
      email: body?.email,
      password: body?.password
        ? await bcrypt.hash(body.password, 10)
        : undefined,
      type: body?.type ?? undefined,
      info: body?.info,
      roomId: body?.roomId ?? undefined,
    },
    ...select_include,
  });

  return user;
}

async function remove(id: number) {
  const user = await prisma.user.delete({
    where: { id: +id },
    ...select_include,
  });

  return user;
}
