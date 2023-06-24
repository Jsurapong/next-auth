"use client";

import React from "react";
import { Row, Col } from "antd";

import FilterBar from "./FilterBar";
import Table from "./Table";

const Report = () => {
  const [roomId, setRoomId] = React.useState<number | undefined>();
  const [year, setYear] = React.useState<number | undefined>();
  const [term, setTerm] = React.useState<number | undefined>();

  const onChange = (value: number | undefined) => {
    setRoomId(value);
  };

  const onChangeYear = (value: number | undefined) => {
    setYear(value);
  };

  const onChangeTerm = (value: number | undefined) => {
    setTerm(value);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FilterBar
            onChange={onChange}
            onChangeYear={onChangeYear}
            onChangeTerm={onChangeTerm}
          />
        </Col>
        <Col span={24}>
          <Table roomId={roomId!} year={year!} term={term!} />
        </Col>
      </Row>
    </>
  );
};

export default Report;
