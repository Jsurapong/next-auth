"use client";

import React from "react";
import Link from "next/link";
import { Space, Table, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  useGetDepartmentQuery,
  useDeleteDepartmentMutation,
} from "@/app/department/service";
import type { ReturnDepartments } from "@/app/api/department/controller";

type DataType = ReturnDepartments[number];

const UserTable: React.FC = () => {
  const { data, isFetching } = useGetDepartmentQuery({});

  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleDelete = (id: number) => {
    deleteDepartment(id);
  };

  return (
    <Card extra={<Link href={"/department/form"}>Add</Link>}>
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
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/department/form/${record.id}`}>Update</Link>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
      width: "10%",
    },
  ];
}
