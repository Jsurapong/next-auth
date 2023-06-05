"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Space, Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { useGetCheckRoomQuery } from "@/app/check-list/service";
import type { ReturnCheckRooms } from "@/app/api/checkRoom/controller";

import { StatusOption } from "@/components/CheckList/constants";

type DataType = ReturnCheckRooms[number];

const CheckRoomTable: React.FC = () => {
  const { data, isFetching } = useGetCheckRoomQuery({});

  const params = useParams();

  const roomId = +params?.roomId;

  const item = data?.[0];
  const roomName = item?.room?.name;
  const departmentName = item?.room?.department?.name;

  return (
    <Card
      title={
        <>
          <Link href={`/check-list`}>Back</Link> จัดการเช็คชื่อ {roomName}{" "}
          {departmentName}
        </>
      }
      extra={<Link href={`/check-list/${roomId}/room/check`}>เพิ่ม</Link>}
    >
      <Table
        loading={isFetching}
        columns={makeColumns(roomId)}
        rowKey={"id"}
        dataSource={data}
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
    },
    {
      title: "ครั้งที่",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "เทอม",
      dataIndex: "term",
      key: "term",
      align: "center",
    },
    {
      title: "สถานะ ผ่าน/ไม่ผ่าน",
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
