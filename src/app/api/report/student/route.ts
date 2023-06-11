import { verifyApi, response } from "@/lib/api";

import { student } from "./controller";

export async function GET(request: Request) {
  verifyApi(request); // use middleware

  try {
    const result = await student.get(request);

    return response.get(JSON.stringify(result));
  } catch (error) {
    return response.error(JSON.stringify(error));
  }
}
