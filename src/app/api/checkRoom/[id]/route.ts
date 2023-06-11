import { verifyApi, response } from "@/lib/api";

import { checkRoom } from "../controller";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const result = await checkRoom.getById(request, +params.id);

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
    const result = await checkRoom.update(request, +params.id);

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
    const result = await checkRoom.remove(+params.id);

    return response.delete(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
