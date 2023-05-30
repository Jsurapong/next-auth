import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { verifyApi, response } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const room = await prisma.room.findFirst({
      where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
    });

    return new Response(JSON.stringify(room));
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
    name: string;
    teacherId: number;
    departmentId: number;
    term: number;
    date: string;
  };

  try {
    const body: RequestBody = await request.json();

    const room = await prisma.room.update({
      where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
      data: {
        name: body?.name,
        departmentId: body?.departmentId,
        teacherId: body?.teacherId,
        date: body?.date,
        term: body?.term,
      },
    });

    return response.put(JSON.stringify(room));
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
    const room = await prisma.room.delete({
      where: {
        id: +params.id,
      },
    });

    return response.delete(JSON.stringify({}));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
