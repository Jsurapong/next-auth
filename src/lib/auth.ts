import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/logout",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
