"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetUserQuery, useDeleteUserMutation } from "@/app/user/service";
import type { ReturnUsers } from "@/app/api/user/controller";

type DataType = ReturnUsers[number];

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetUserQuery({});

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: number) => {
    deleteUser(id);
  };

  console.log({ data });

  return (
    <Card extra={<Link href={"/user/form"}>Add</Link>}>
      <Table
        loading={isFetching}
        columns={makeColumns(handleDelete)}
        rowKey={"id"}
        dataSource={data}
      />
    </Card>
  );
};

export default UserTable;

function makeColumns(
  handleDelete: (id: number) => void
): ColumnsType<DataType> {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "f_name",
      key: "f_name",
    },
    {
      title: "Last Name",
      dataIndex: "l_name",
      key: "l_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Room",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Role",
      dataIndex: "type",
      key: "type",
      // render:
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/user/form/${record.id}`}>Update</Link>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
}
