"use client";

import { Row, Col } from "antd";
import { useSession } from "next-auth/react";

import LogStudentChart from "./LogStudentChart";
import TotalStudentChart from "./TotalStudentChart";
import Info from "./Info";

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = +session?.user?.id!;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Info userId={userId} />
        </Col>
        <Col xs={24} sm={24} md={16}>
          <TotalStudentChart userId={userId} />
        </Col>
        <Col xs={24} sm={24} md={24}>
          <LogStudentChart userId={userId} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
