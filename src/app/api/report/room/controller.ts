import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const room = { get };

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ReturnRoomReport = ThenArg<ReturnType<typeof room.get>>;

// ============= Action Prisma ==================

const select_include = Prisma.validator<Prisma.CheckRoomArgs>()({});

async function get(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = +searchParams.get("roomId")!;

  const report = await prisma.checkRoom.findMany({
    where: { roomId },
    ...select_include,
  });
  return report;
}
