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
  users: number[];
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
    refetch();
    method === "add" && form.resetFields();
  };

  const { data: departmentData, isFetching: departmentLoading } =
    useGetDepartmentQuery({});
  const {
    data: usersData,
    isFetching: userLoading,
    refetch,
  } = useGetUserQuery({}, { refetchOnMountOrArgChange: true });

  const departmentOptions = departmentData?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const teacherOptions = usersData
    ?.filter((item) => item.type === Role.TeacherL2)
    ?.map((item) => ({
      label: `${item.f_name} ${item.l_name}`,
      value: item.id,
    }));

  const studentEmptyRoomOptions = usersData
    ?.filter(
      (item) =>
        (item.type === Role.Student && !item.roomId) ||
        initialValues?.users?.includes(item.id)
    )
    ?.map((item) => ({
      label: `${item.f_name} ${item.l_name}`,
      value: item.id,
    }));

  const title = method === "add" ? "เพิ่มห้อง" : "แก้ไขห้อง";

  return (
    <Card title={title} loading={loading}>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
      >
        <Form.Item name="name" label="ชื่อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="teacherId"
          label="ครูประจำชั้น"
          rules={[{ required: true }]}
        >
          <Select loading={userLoading} options={teacherOptions} />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label="แผนก"
          rules={[{ required: true }]}
        >
          <Select loading={departmentLoading} options={departmentOptions} />
        </Form.Item>
        <Form.Item name="users" label="นักเรียน" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            loading={departmentLoading}
            options={studentEmptyRoomOptions}
          />
        </Form.Item>
        <Form.Item name="year" label="ปีกาศีกษา" rules={[{ required: true }]}>
          <Select options={yearOption} />
        </Form.Item>
        <Form.Item name="term" label="เทอม" rules={[{ required: true }]}>
          <Select options={termOptions} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Link href="/room">
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
