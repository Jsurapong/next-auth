import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { verifyApi, response } from "@/lib/api";

export async function GET(request: Request, {}) {
  verifyApi(request); // use middleware

  try {
    const user = await prisma.user.findMany({
      // convert string to number add "+" prefix "params.id"
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
    });

    return response.get(JSON.stringify(user));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
  // verifyApi(request); // use middleware

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

  try {
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
    });

    const { password, ...result } = user;
    return response.post(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
