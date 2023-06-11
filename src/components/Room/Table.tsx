"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetRoomQuery, useDeleteRoomMutation } from "@/app/room/service";
import { useGetUserQuery } from "@/app/user/service";
import type { ReturnRooms } from "@/app/api/room/controller";

import { yearOption } from "./constants";

type DataType = ReturnRooms[number];

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetRoomQuery({});

  const { data: users } = useGetUserQuery({});

  const [deleteRoom] = useDeleteRoomMutation();

  const handleDelete = (id: number) => {
    deleteRoom(id);
  };

  const getTeacher = (id: number) => {
    const teacher = users?.find((item) => item.id === id);

    if (teacher) {
      return `${teacher.f_name} ${teacher.l_name}`;
    }
  };

  return (
    <Card title="จัดการห้อง" extra={<Link href={"/room/form"}>เพิ่ม</Link>}>
      <Table
        loading={isFetching}
        columns={makeColumns(handleDelete, getTeacher)}
        rowKey={"id"}
        dataSource={data}
      />
    </Card>
  );
};

export default UserTable;

function makeColumns(
  handleDelete: (id: number) => void,
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
          <Link href={`/room/form/${record.id}`}>แก้ไข</Link>
          <Popconfirm
            title="ยืนยันการลบ"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>ลบ</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}
