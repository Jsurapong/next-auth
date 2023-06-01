import { verifyApi, response } from "@/lib/api";
import { get, create } from "./controller";

export async function GET(request: Request, {}) {
  verifyApi(request); // use middleware

  try {
    const user = await get();

    return response.get(JSON.stringify(user));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}

export async function POST(request: Request) {
  // verifyApi(request); // use middleware

  try {
    const user = await create(request);

    return response.post(JSON.stringify(user));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
