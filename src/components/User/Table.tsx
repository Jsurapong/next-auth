"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetUserQuery, useDeleteUserMutation } from "@/app/user/service";
import type { ReturnUsers } from "@/app/api/user/controller";

import { roleOptions } from "./constants";

type DataType = ReturnUsers[number];

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetUserQuery({});

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: number) => {
    deleteUser(id);
  };

  return (
    <Card
      title="จัดการผู้ใช้งาน"
      extra={<Link href={"/user/form"}>เพิ่ม</Link>}
    >
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
      title: "ไอดี",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "f_name",
      key: "f_name",
    },
    {
      title: "สกุล",
      dataIndex: "l_name",
      key: "l_name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "สิทธิ์",
      dataIndex: "type",
      key: "type",
      render: (value) =>
        roleOptions?.find((item) => item.value === value)?.label,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/user/form/${record.id}`}>แก้ไข</Link>
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
