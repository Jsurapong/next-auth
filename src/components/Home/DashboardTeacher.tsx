"use client";

import React from "react";
import { Row, Col } from "antd";

import LogStudentChart from "./LogStudentChart";
import FilterRoom from "./FilterRoom";
import TotalRoomChart from "./TotalRoomChart";
import Info from "./Info";

const DashboardTeacher = () => {
  const [room, setRoom] = React.useState<number | undefined>();

  const onChange = (value: number | undefined) => {
    setRoom(value);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FilterRoom onChange={onChange} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          {/* <Info userId={userId} /> */}
        </Col>
        <Col xs={24} sm={24} md={12}>
          {/* <TotalRoomChart userId={userId} /> */}
        </Col>
        <Col xs={24} sm={24} md={24}>
          {/* <LogStudentChart userId={userId} /> */}
        </Col>
      </Row>
    </>
  );
};

export default DashboardTeacher;
