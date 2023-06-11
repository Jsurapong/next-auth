"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetRoomQuery } from "@/app/room/service";
import { useGetUserQuery } from "@/app/user/service";
import type { ReturnRooms } from "@/app/api/room/controller";

import { yearOption } from "@/components/Room/constants";

type DataType = ReturnRooms[number];

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetRoomQuery({});

  const { data: users } = useGetUserQuery({});

  const getTeacher = (id: number) => {
    const teacher = users?.find((item) => item.id === id);

    if (teacher) {
      return `${teacher.f_name} ${teacher.l_name}`;
    }
  };

  return (
    <Card title="เช็คชื่อรายห้อง">
      <Table
        loading={isFetching}
        columns={makeColumns(getTeacher)}
        rowKey={"id"}
        dataSource={data}
      />
    </Card>
  );
};

export default UserTable;

function makeColumns(
  renderTeacher: (id: number) => string | undefined
): ColumnsType<DataType> {
  return [
    {
      title: "ไอดี",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ชื่อห้อง",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ครูประจำชั้น",
      dataIndex: "teacherId",
      key: "teacherId",
      render: renderTeacher,
    },
    {
      title: "ชั้นการศึกษา",
      dataIndex: "year",
      key: "year",
      render: (value) => yearOption.find((item) => item.value === value)?.label,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/check-list/${record.id}/room`}>เช็ค</Link>
        </Space>
      ),
      align: "center",
    },
  ];
}
