"use client";

import Link from "next/link";
import React from "react";
import { Button, Form, Input, Space, Card } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type Values = {
  name: string;
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
    method === "add" && form.resetFields();
  };

  const title = method === "add" ? "เพิ่มแผนก" : "แก้ไขแผนก";

  return (
    <Card title={title} loading={loading}>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
      >
        <Form.Item name="name" label="ชื่อแผนก" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Link href="/department">
              <Button type="default">ยกเลิก</Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={submitting}>
              บันทึก
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormApp;
