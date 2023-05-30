import prisma from "@/lib/prisma";
import { verifyApi, response } from "@/lib/api";

export async function GET(request: Request, {}) {
  verifyApi(request); // use middleware

  try {
    const department = await prisma.department.findMany({});

    return response.get(JSON.stringify(department));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
  verifyApi(request); // use middleware

  type RequestBody = {
    name: string;
  };

  try {
    const body: RequestBody = await request.json();

    const department = await prisma.department.create({
      data: { name: body?.name },
    });

    return response.post(JSON.stringify(department));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
