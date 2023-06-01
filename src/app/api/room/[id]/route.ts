import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

import { room } from "../controller";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const result = await room.getById(+params.id);

    return response.get(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const result = await room.update(request, +params.id);

    return response.put(JSON.stringify(result));
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
    const result = await room.remove(params.id);

    return response.delete(JSON.stringify({}));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
