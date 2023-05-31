import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { signIn } from "next-auth/react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log("server render");

  return <pre>Index</pre>;
}
