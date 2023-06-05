"use client";

import Link from "next/link";
import React from "react";
import { Button, Form, Input, Space, Card, Select, InputNumber } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type Values = {
  isPass: boolean;
  users: { id: number; isPass: boolean }[];
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

  const roomId = 1;

  return (
    <Card
      title={<Link href={`check-list/${roomId}/room`}>กลับ</Link>}
      loading={loading}
    >
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        // initialValues={initialValues}
        initialValues={{ isPass: undefined, users: [{ id: 1, isPass: true }] }}
      >
        <Form.Item
          name="isPass"
          label="สำหรับครูปกครอง"
          rules={[{ required: true }]}
        >
          <Select
            disabled
            options={[
              { label: "ผ่าน", value: true },
              { label: "ไม่ผ่าน", value: false },
            ]}
          />
        </Form.Item>

        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    label="นายดำ"
                    name={[name, "id"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Select
                      style={{ width: "200px" }}
                      options={[
                        { label: "ผ่าน", value: true },
                        { label: "ไม่ผ่าน", value: false },
                      ]}
                    ></Select>
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item {...tailLayout}>
          <Space>
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
