"use-client";

import React from "react";
import { Menu } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";

import { roleOptions } from "@/components/User/constants";

const TopNav: React.FC = () => {
  const { data: session } = useSession();

  const role = roleOptions?.find(
    (item) => item.value === session?.user?.type
  )?.label;

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ justifyContent: "end" }}
      items={[
        {
          label: (session?.user.f_name || "") + "  " + (role || ""),
          key: "profile",
        },
        {
          label: "ออกจากระบบ",
          key: "sign-out",
          onClick: () => {
            signOut();
            signIn();
          },
        },
      ]}
    />
  );
};

export default TopNav;
