"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";

import TopNav from "@/components/TopNav";

const { Header, Content, Footer, Sider } = Layout;

enum Role {
  Admin = 1,
  TeacherL1 = 2,
  TeacherL2 = 3,
  Student = 4,
}

const Menus = [
  {
    title: "Manage User",
    path: "/user",
  },
  {
    title: "Manage Teacher",
    path: "/teacher",
  },
  {
    title: "Student",
    path: "/student",
  },
  {
    title: "Check List",
    path: "/check-list",
  },
  {
    title: "Report",
    path: "/report",
  },
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
            background: "rgba(255,255,255,.2)",
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
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
