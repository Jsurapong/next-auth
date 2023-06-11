import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const student = { get };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnStudentReport = ThenArg<ReturnType<typeof student.get>>;

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
