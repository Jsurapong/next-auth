import { verifyApi, response } from "@/lib/api";

import { student } from "../controller";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  verifyApi(request); // use middleware

  try {
    const result = await student.getById(+params.id);

    return new Response(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
