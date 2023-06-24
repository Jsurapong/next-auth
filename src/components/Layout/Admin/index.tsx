"use client";

import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import TopNav from "@/components/TopNav";
import { authClient } from "@/lib/authClient";

import { Role } from "@/lib/types/role";
const { Header, Content, Footer, Sider } = Layout;

const Menus = [
  {
    title: "หน้าแรก",
    path: "/",
    roles: [Role.Admin, Role.TeacherL1, Role.TeacherL2, Role.Student],
  },
  {
    title: "รายงาน",
    path: "/report",
    roles: [Role.Admin, Role.TeacherL1],
  },
  {
    title: "จัดการผู้ใช้งาน",
    path: "/user",
    roles: [Role.Admin],
  },
  {
    title: "จัดการห้อง",
    path: "/room",
    roles: [Role.Admin],
  },

  {
    title: "เช็คชื่อรายห้อง",
    path: "/check-list",
    roles: [Role.Admin, Role.TeacherL1, Role.TeacherL2],
  },
  {
    title: "จัดการแผนก",
    path: "/department",
    roles: [Role.Admin],
  },
];

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const MenusByRole = Menus.filter((item) =>
    authClient(item.roles, session?.user?.type!)
  ).map((item) => ({ label: item.title, key: item.path }));

  // if (!session) return null;

  useEffect(() => {}, []);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log({ broken });
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            height: "32px",
            margin: "16px",
            // background: "rgba(255,255,255,.2)",
            borderRadius: "6px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={MenusByRole}
          onClick={(e) => router.push(e.key)}
        />
      </Sider>
      <Layout>
        <Header>
          <TopNav />
        </Header>
        <Content style={{ margin: "24px 16px 0", minHeight: "100vh" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh" /* fall-back */,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ระบบตรวจสอบเครื่องแต่งการนักศึกษา
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
