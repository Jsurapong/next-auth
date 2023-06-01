import "./globals.css";
// import { Inter } from "next/font/google";
import "antd/dist/reset.css";

import {
  NextAuthProvider,
  RootStyleRegistry,
  StoreProvider,
} from "../components/Provider";
// import AppBar from "@/components/AppBar";
import LayoutAdmin from "@/components/Layout/Admin";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>
          <NextAuthProvider>
            <StoreProvider>
              <LayoutAdmin>{children}</LayoutAdmin>
            </StoreProvider>
          </NextAuthProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
