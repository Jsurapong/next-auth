"use client";

import { Row, Col } from "antd";

import LogStudentChart from "./LogStudentChart";
import TotalStudentChart from "./TotalStudentChart";
import Info from "./Info";

const Dashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={24} md={12}>
          <Info />
        </Col>
        <Col sm={24} md={12}>
          <TotalStudentChart />
        </Col>
        <Col sm={24} md={24}>
          <LogStudentChart />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
