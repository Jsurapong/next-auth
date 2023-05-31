import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <pre>check-list</pre>;
}
