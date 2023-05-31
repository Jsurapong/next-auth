import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

export async function GET(request: Request, {}) {
  verifyApi(request); // use middleware

  try {
    const checkRoom = await prisma.checkRoom.findMany({
      // convert string to number add "+" prefix "params.id",
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

    return response.get(JSON.stringify(checkRoom));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
  // verifyApi(request); // use middleware

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

    const checkRoom = await prisma.checkRoom.create({
      data: {
        date: body?.date,
        term: body?.term,
        time: body?.time,
        isPass: body?.isPass,
        roomId: body?.roomId,
        checkStudent: {
          // createMany: {
          //   data: body?.checkStudent?.map((item) => ({
          //     userId: item.userId,
          //     isPass: item.isPass,
          //   })),
          // },
        },
      },
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

    return response.post(JSON.stringify(checkRoom));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
