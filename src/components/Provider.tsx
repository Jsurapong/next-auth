"use client";

import { useState, type PropsWithChildren } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import th_TH from "antd/locale/th_TH";

import store from "@/store";
import { Provider } from "react-redux";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const AntDProvider = ({ children }: Props) => {
  return <ConfigProvider locale={th_TH}>{children}</ConfigProvider>;
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

  if (typeof window !== "undefined") return <>{children}</>;

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
