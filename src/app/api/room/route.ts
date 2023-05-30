import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { verifyApi, response } from "@/lib/api";

export async function GET(request: Request, {}) {
  verifyApi(request); // use middleware

  try {
    const room = await prisma.room.findMany({});

    return response.get(JSON.stringify(room));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
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

    const room = await prisma.room.create({
      data: {
        name: body?.name,
        departmentId: body?.departmentId,
        teacherId: body?.teacherId,
        date: body?.date,
        term: body?.term,
      },
    });

    return response.post(JSON.stringify(room));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
