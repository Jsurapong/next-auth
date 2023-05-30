import prisma from "@/lib/prisma";
import { exclude } from "@/lib/exclude";
import * as bcrypt from "bcrypt";
import { verifyApi, response } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const checkRoom = await prisma.checkRoom.findFirst({
      // convert string to number add "+" prefix "params.id",
      where: { id: +params.id },
      include: {
        room: { select: { name: true, teacherId: true, term: true } },
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

    return new Response(JSON.stringify(checkRoom));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  type RequestBody = {
    date: string;
    term: number;
    time: number;
    isPass: boolean;
    roomId: number;
    checkStudent: { userId: number; isPass: boolean }[];
  };

  try {
    const body: RequestBody = await request.json();

    const checkRoom = await prisma.checkRoom.update({
      where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
      data: {
        date: body?.date,
        term: body?.term,
        time: body?.time,
        isPass: body?.isPass,
        roomId: body?.roomId,
        checkStudent: {
          update: body?.checkStudent?.map((item) => ({
            where: {
              checkRoomId_userId: {
                checkRoomId: +params.id,
                userId: item.userId,
              },
            },
            data: { isPass: item.isPass },
          })),
        },
      },
      include: {
        room: { select: { name: true, teacherId: true, term: true } },
        checkStudent: {
          select: {
            checkRoomId: true,
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

    return response.put(JSON.stringify(checkRoom));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const checkRoom = await prisma.checkRoom.delete({
      where: {
        id: +params.id,
      },
    });

    return response.delete(JSON.stringify({}));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
