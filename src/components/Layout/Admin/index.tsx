"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";

import TopNav from "@/components/TopNav";

const { Header, Content, Footer, Sider } = Layout;

const Menus = [
  {
    title: "หน้าแรก",
    path: "/",
  },
  {
    title: "จัดการผู้ใช้งาน",
    path: "/user",
  },
  {
    title: "จัดการห้อง",
    path: "/room",
  },

  {
    title: "เช็คชื่อรายห้อง",
    path: "/check-list",
  },
  {
    title: "จัดการแผนก",
    path: "/department",
  },
  // {
  //   title: "Report",
  //   path: "/report",
  // },
];

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
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
          items={Menus.map((item) => ({ label: item.title, key: item.path }))}
          onClick={(e) => router.push(e.key)}
        />
      </Sider>
      <Layout>
        <Header>
          <TopNav />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              height: "100vh",
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
