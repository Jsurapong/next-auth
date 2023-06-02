"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card } from "antd";
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
    <Card extra={<Link href={"/room/form"}>Add</Link>}>
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Teacher",
      dataIndex: "teacherId",
      key: "teacherId",
      render: renderTeacher,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (value) => yearOption.find((item) => item.value === value)?.label,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/room/form/${record.id}`}>Update</Link>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
}
