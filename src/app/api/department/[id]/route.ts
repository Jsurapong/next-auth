import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const department = await prisma.department.findFirst({
      where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
    });

    return new Response(JSON.stringify(department));
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
  };

  try {
    const body: RequestBody = await request.json();

    const department = await prisma.department.update({
      where: { id: +params.id }, // convert string to number add "+" prefix "params.id"
      data: {
        name: body?.name,
      },
    });

    return response.put(JSON.stringify(department));
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
    const department = await prisma.department.delete({
      where: {
        id: +params.id,
      },
    });

    return response.delete(JSON.stringify({}));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
