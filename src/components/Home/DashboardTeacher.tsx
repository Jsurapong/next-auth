"use client";

import React from "react";
import { Row, Col } from "antd";

import LogRoomChart from "./LogRoomChart";
import FilterRoom from "./FilterRoom";
import TotalRoomChart from "./TotalRoomChart";
import LogRoomTable from "./LogRoomTable";

import FilterStudent from "./FilterStudent";
import LogStudentChart from "./LogStudentChart";
import TotalStudentChart from "./TotalStudentChart";
import Info from "./Info";

const DashboardTeacher = () => {
  const [roomId, setRoomId] = React.useState<number | undefined>();
  const [studentId, setStudentId] = React.useState<number | undefined>();

  const onChange = (value: number | undefined) => {
    setRoomId(value);
  };
  const onChangeStudent = (value: number | undefined) => {
    setStudentId(value);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FilterRoom onChange={onChange} />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <TotalRoomChart roomId={roomId!} />
        </Col>
        <Col xs={24} sm={24} md={18}>
          <LogRoomTable roomId={roomId!} />
        </Col>
        <Col xs={24} sm={24} md={24}>
          <LogRoomChart roomId={roomId!} />
        </Col>
        <Col span={24}>
          <FilterStudent onChange={onChangeStudent} roomId={roomId!} />
        </Col>
        {studentId && (
          <>
            <Col xs={24} sm={24} md={6}>
              <Info userId={studentId!} />
            </Col>
            <Col xs={24} sm={24} md={18}>
              <LogStudentChart userId={studentId!} />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default DashboardTeacher;
