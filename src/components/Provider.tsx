"use client";

import { useState, type PropsWithChildren } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const AntDProvider = ({ children }: Props) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
