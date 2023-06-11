import { verifyApi, response } from "@/lib/api";

import { checkRoom } from "./controller";

export async function GET(request: Request) {
  verifyApi(request); // use middleware

  try {
    const result = await checkRoom.get(request);

    return response.get(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
  verifyApi(request); // use middleware

  try {
    const result = await checkRoom.create(request);

    return response.post(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
