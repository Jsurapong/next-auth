"use client";

import Link from "next/link";
import React from "react";
import { Button, Form, Input, Space, Card, Select } from "antd";

import { useGetDepartmentQuery } from "@/app/department/service";
import { useGetUserQuery } from "@/app/user/service";

import { yearOption, termOptions } from "./constants";
import { Role } from "@/lib/types/role";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type Values = {
  name: string;
  teacherId: number;
  departmentId: number;
  term: number;
  year: number;
};

type FormAppProps = {
  handleSubmit: (values: Values) => Promise<any>;
  submitting: boolean;
  initialValues?: Partial<Values>;
  loading?: boolean;
  method: "add" | "update";
};

const FormApp: React.FC<FormAppProps> = ({
  handleSubmit,
  submitting,
  initialValues,
  loading,
  method,
}) => {
  const [form] = Form.useForm<Values>();

  const onFinish = async (values: Values) => {
    console.log(values);
    await handleSubmit(values);
    form.resetFields();
  };

  const { data: departmentData, isFetching: departmentLoading } =
    useGetDepartmentQuery({});
  const { data: usersData, isFetching: userLoading } = useGetUserQuery({});

  return (
    <Card title={<Link href="/room">Back</Link>} loading={loading}>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="teacherId"
          label="Teacher"
          rules={[{ required: true }]}
        >
          <Select
            loading={userLoading}
            options={usersData
              ?.filter((item) => item.type === Role.TeacherL2)
              ?.map((item) => ({
                label: `${item.f_name} ${item.l_name}`,
                value: item.id,
              }))}
          />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label="Department"
          rules={[{ required: true }]}
        >
          <Select
            loading={departmentLoading}
            options={departmentData?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
          <Select options={yearOption} />
        </Form.Item>
        <Form.Item name="term" label="Term" rules={[{ required: true }]}>
          <Select options={termOptions} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormApp;
