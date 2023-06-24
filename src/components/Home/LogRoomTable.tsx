import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { orderBy } from "lodash";

import { useGetRoomReportQuery } from "@/app/service";
import type { ReturnRoomReport } from "@/app/api/report/room/controller";

import { StatusOption } from "@/components/CheckList/constants";
import { yearOption } from "@/components/Room/constants";

type DataType = ReturnRoomReport[number];

const LogRoomTable: React.FC<{ roomId: number }> = ({ roomId }) => {
  const { data, isFetching } = useGetRoomReportQuery(roomId, {
    skip: !roomId,
  });

  const newData = orderBy(
    data,
    ["year", "term", "time"],
    ["desc", "desc", "desc"]
  );

  return (
    <Card title="ผลการตรวจของนักเรียน">
      <Table
        size={"small"}
        loading={isFetching}
        columns={makeColumns(roomId)}
        rowKey={"id"}
        dataSource={newData}
      />
    </Card>
  );
};

export default LogRoomTable;

function makeColumns(roomId: number): ColumnsType<DataType> {
  return [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
      render: (value) => dayjs(value).format("D MMM YYYY"),
      sorter: (a, b) =>
        dayjs(a.date)
          ?.format("YYYYMMDD")
          ?.localeCompare(dayjs(b.date)?.format("YYYYMMDD")),
    },
    {
      title: "ชั้นการศึกษา",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (v) => yearOption?.find((item) => item.value === v)?.label,
    },
    {
      title: "เทอม",
      dataIndex: "term",
      key: "term",
      align: "center",
      sorter: (a, b) => a.term - b.term,
    },
    {
      title: "ครั้งที่",
      dataIndex: "time",
      key: "time",
      align: "center",
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: "ฝ่ายปกครอง ผ่าน/ไม่ผ่าน",
      dataIndex: "isPass",
      key: "isPass",
      align: "center",
      render: (value) =>
        StatusOption?.find((item) => item.value === value)?.label,
    },
  ];
}
