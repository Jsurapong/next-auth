import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { verifyJwt } from "@/lib/jwt";

interface RequestBody {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  type: number;
  info?: string;
  roomId: number;
}

export async function GET(request: Request, {}) {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

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

  return new Response(JSON.stringify(user));
}

export async function POST(request: Request) {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      id: +body.id,
      f_name: body.f_name,
      l_name: body.l_name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      type: +body.type,
      info: body?.info,
      roomId: +body.roomId,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result), { status: 201 });
}
