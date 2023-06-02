import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export const department = { get, getById, create, update, remove };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnDepartments = ThenArg<ReturnType<typeof department.get>>;
export type ReturnDepartment = ThenArg<ReturnType<typeof department.getById>>;
export type ReturnDepartmentCreate = ThenArg<
  ReturnType<typeof department.create>
>;
export type ReturnDepartmentUpdate = ThenArg<
  ReturnType<typeof department.update>
>;
export type ReturnDepartmentDelete = ThenArg<
  ReturnType<typeof department.remove>
>;
export type RequestBodyCreate = {
  name: string;
};
export type RequestBodyUpdate = Omit<RequestBodyCreate, "id">;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.DepartmentArgs>()({});

async function get() {
  const departments = await prisma.department.findMany({
    ...select_include,
  });
  return departments;
}

async function getById(id: number) {
  const department = await prisma.department.findFirst({
    where: { id: +id },
    ...select_include,
  });
  return department;
}

async function create(request: Request) {
  const body: RequestBodyCreate = await request.json();

  const department = await prisma.department.create({
    data: { name: body?.name },
  });

  return department;
}

async function update(request: Request, id: number) {
  const body: RequestBodyUpdate = await request.json();

  const department = await prisma.department.update({
    where: { id: +id }, // convert string to number add "+" prefix "params.id"
    data: {
      name: body?.name,
    },
    ...select_include,
  });

  return department;
}

async function remove(id: number) {
  const department = await prisma.department.delete({
    where: { id: +id },
    ...select_include,
  });

  return department;
}
