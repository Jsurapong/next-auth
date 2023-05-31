"use-client";

import React from "react";
import { Menu } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";

const TopNav: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ justifyContent: "end" }}
      items={[
        { label: "Profile " + session?.user.f_name, key: "profile" },
        { label: "Sign-out", key: "sign-out", onClick: () => signOut() },
      ]}
    />
  );
};

export default TopNav;
