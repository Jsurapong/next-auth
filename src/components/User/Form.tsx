"use client";

import Link from "next/link";
import React from "react";
import { Button, Form, Input, Space, Card, Select, InputNumber } from "antd";

import { roleOptions } from "./constants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type Values = {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  type: number;
  roomId: number;
};

type FormAppProps = {
  handleSubmit: (values: Values) => Promise<any>;
  submitting: boolean;
  initialValues?: Partial<Omit<Values, "password">>;
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
    method === "add" && form.resetFields();
  };

  return (
    <Card title={<Link href="/user">Back</Link>} loading={loading}>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
      >
        <Form.Item name="id" label="Id" rules={[{ required: true }]}>
          <InputNumber
            style={{ width: "100%" }}
            disabled={method === "update"}
          />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {method === "add" && (
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="f_name"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="l_name" label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Role" rules={[{ required: true }]}>
          <Select disabled={method === "update"} options={roleOptions}></Select>
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
