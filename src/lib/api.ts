import { verifyJwt } from "@/lib/jwt";

export const verifyApi = (request: Request) => {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
};

export const response = {
  get: (data: string | undefined | null) => new Response(data, { status: 200 }),
  post: (data: string | undefined | null) =>
    new Response(data, { status: 201 }),
  put: (data: string | undefined | null) => new Response(data, { status: 202 }),
  delete: (data: string | undefined | null) =>
    new Response(data, { status: 200 }),
  error: (data: string | undefined | null) =>
    new Response(data, { status: 400 }),
};
