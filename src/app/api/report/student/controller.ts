import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const student = { get };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnStudentReport = ThenArg<ReturnType<typeof student.get>>;
// export type ReturnRoom = ThenArg<ReturnType<typeof student.getById>>;
// export type ReturnRoomCreate = ThenArg<ReturnType<typeof room.create>>;
// export type ReturnRoomUpdate = ThenArg<ReturnType<typeof room.update>>;
// export type ReturnRoomDelete = ThenArg<ReturnType<typeof room.remove>>;
// export type RequestBodyCreate = {
//   name: string;
//   teacherId: number;
//   departmentId: number;
//   term: number;
//   year: number;
//   users: number[];
// };
// export type RequestBodyUpdate = RequestBodyCreate;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.CheckStudentArgs>()({
  include: {
    checkRoom: { include: { room: true } },
  },
});

async function get(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = +searchParams.get("userId")!;

  const report = await prisma.checkStudent.findMany({
    where: { userId },
    ...select_include,
  });
  return report;
}

// async function getById(id: number) {
//   const department = await prisma.checkStudent.findFirst({
//     where: { userId: +id },
//     ...select_include,
//   });
//   return department;
// }
