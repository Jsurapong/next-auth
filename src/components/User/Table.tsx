"use client";

import React from "react";
import { Space, Table } from "antd";
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

  const columns: ColumnsType<DataType> = [
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
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <a>Invite</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      rowKey={"id"}
      dataSource={data}
    />
  );
};

export default UserTable;
