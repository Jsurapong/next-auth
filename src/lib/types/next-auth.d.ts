import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      f_name: string;
      l_name: string;
      email: string;
      accessToken: string;
      type: number;
    };
  }
}
