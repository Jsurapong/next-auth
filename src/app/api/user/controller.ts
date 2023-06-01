import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

const select_include: Prisma.UserArgs = {
  select: {
    id: true,
    email: true,
    f_name: true,
    l_name: true,
    password: false,
    type: true,
    info: true,
    roomId: true,
  },
};

export async function get() {
  const users = await prisma.user.findMany({
    ...select_include,
  });
  return users;
}

export async function getById(id: number) {
  const users = await prisma.user.findFirst({
    where: { id: +id },
    ...select_include,
  });
  return users;
}

export async function create(request: Request) {
  type RequestBody = {
    id: number;
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    type: number;
    info?: string;
    roomId: number;
  };

  const body: RequestBody = await request.json();

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

export async function update(request: Request, id: number) {
  type RequestBody = {
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    type: number;
    info?: string;
    roomId: number;
  };

  const body: RequestBody = await request.json();

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

export async function deleteUser(id: number) {
  const user = await prisma.user.delete({
    where: { id: +id },
    ...select_include,
  });

  return user;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnUsers = ThenArg<ReturnType<typeof get>>;
export type ReturnUser = ThenArg<ReturnType<typeof getById>>;
export type ReturnUserCreate = ThenArg<ReturnType<typeof create>>;
export type ReturnUserUpdate = ThenArg<ReturnType<typeof update>>;
export type ReturnUserDelete = ThenArg<ReturnType<typeof deleteUser>>;