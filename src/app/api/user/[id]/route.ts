import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

import { getById, update, deleteUser } from "@/app/api/user/controller";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const user = await getById(params.id);

    return new Response(JSON.stringify(user));
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
    const user = await update(request, params.id);

    return response.put(JSON.stringify(user));
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
    const user = await deleteUser(params.id);

    return response.delete(JSON.stringify(user));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
