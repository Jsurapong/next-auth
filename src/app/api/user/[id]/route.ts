import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

import { user } from "@/app/api/user/controller";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const result = await user.getById(params.id);

    return new Response(JSON.stringify(result));
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
    const result = await user.update(request, params.id);

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
    const result = await user.remove(params.id);

    return response.delete(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
