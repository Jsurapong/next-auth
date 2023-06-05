"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetRoomQuery } from "@/app/room/service";
import type { ReturnRooms } from "@/app/api/room/controller";

import { yearOption } from "@/components/Room/constants";

type DataType = ReturnRooms[number];

const CheckRoomTable: React.FC = () => {
  const { data, isFetching } = useGetRoomQuery({});

  const roomId = 1;

  return (
    <Card
      title={
        <>
          <Link href={`/check-list`}>Back</Link> จัดการเช็คชื่อ ห้อง 1 ปวช 1.
        </>
      }
      extra={<Link href={`/check-list/${roomId}/room/check`}>เพิ่ม</Link>}
    >
      <Table
        loading={isFetching}
        columns={makeColumns()}
        rowKey={"id"}
        dataSource={data}
      />
    </Card>
  );
};

export default CheckRoomTable;

function makeColumns(): ColumnsType<DataType> {
  const roomId = 1;

  return [
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ครั้งที่",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "เทอม",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "สถานะ ผ่าน/ไม่ผ่าน",
      dataIndex: "status",
      key: "status",
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
