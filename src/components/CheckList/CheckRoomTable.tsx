"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Space, Table, Card, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { orderBy } from "lodash";

import { useGetCheckRoomQuery } from "@/app/check-list/service";
import type { ReturnCheckRooms } from "@/app/api/checkRoom/controller";

import { StatusOption } from "@/components/CheckList/constants";
import { yearOption } from "@/components/Room/constants";

type DataType = ReturnCheckRooms[number];

const CheckRoomTable: React.FC = () => {
  const params = useParams();

  const roomId = +params?.roomId;

  const { data, isFetching } = useGetCheckRoomQuery({ roomId });

  const newData = orderBy(
    data,
    ["year", "term", "time"],
    ["desc", "desc", "desc"]
  );

  const item = data?.[0];
  const roomName = item?.room?.name;
  const departmentName = item?.room?.department?.name;

  return (
    <Card
      title={
        <Space>
          จัดการเช็คชื่อ {roomName} {departmentName}
        </Space>
      }
      extra={<Link href={`/check-list/${roomId}/room/check`}>เพิ่ม</Link>}
    >
      <Table
        loading={isFetching}
        columns={makeColumns(roomId)}
        rowKey={"id"}
        dataSource={newData}
        footer={() => (
          <Link href={`/check-list`}>
            <Button>ย้อนกลับ</Button>
          </Link>
        )}
      />
    </Card>
  );
};

export default CheckRoomTable;

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
      title: "ฝ่ายปกครอง ",
      dataIndex: "isPass",
      key: "isPass",
      align: "center",
      render: (value) =>
        StatusOption?.find((item) => item.value === value)?.label,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/check-list/${roomId}/room/check/${record.id}`}>ดู</Link>
        </Space>
      ),
      align: "center",
    },
  ];
}
