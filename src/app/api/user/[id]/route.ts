import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { exclude } from "@/lib/exclude";
import * as bcrypt from "bcrypt";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findFirst({
    where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
  });

  const userWithoutPassword = exclude(user!, ["password"]);
  return new Response(JSON.stringify(userWithoutPassword));
}

interface RequestBody {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  type: number;
  info?: string;
  roomId: number;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const body: RequestBody = await request.json();

  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.update({
    where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
    data: {
      f_name: body?.f_name,
      l_name: body?.l_name,
      email: body?.email,
      password: body?.password
        ? await bcrypt.hash(body.password, 10)
        : undefined,
      type: body?.type ?? undefined,
      info: body?.info,
      roomId: body?.roomId ?? undefined,
    },
  });

  const userWithoutPassword = exclude(user!, ["password"]);

  return new Response(JSON.stringify(userWithoutPassword), { status: 202 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  // const body: RequestBody = await request.json();

  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.delete({
    where: {
      id: +params.id,
    },
  });

  return new Response(JSON.stringify({}));
}
