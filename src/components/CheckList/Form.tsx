"use client";

import Link from "next/link";
import React from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Select,
  DatePicker,
  Table,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import { authClient } from "@/lib/authClient";
import { useGetRoomByIdQuery } from "@/app/room/service";
import { useGetCheckRoomQuery } from "@/app/check-list/service";

import { Role } from "@/lib/types/role";

import {
  StatusOption,
  TermOption,
  TimeOption,
  AppStatus,
} from "@/components/CheckList/constants";

import { yearOption } from "../Room/constants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type Values = {
  term: number;
  time: number;
  date: string;
  isPass: boolean;
  checkStudent: { userId: number; isPass: boolean; remark?: string }[];
  year: number;
};

type FormAppProps = {
  handleSubmit: (values: Values) => Promise<any>;
  submitting: boolean;
  initialValues?: Partial<Values>;
  loading?: boolean;
  method: "add" | "update";
  roomId: number;
};

const FormApp: React.FC<FormAppProps> = ({
  handleSubmit,
  submitting,
  initialValues,
  loading,
  method,
  roomId,
}) => {
  const [form] = Form.useForm<Values>();
  const { data: session } = useSession();

  const onFinish = async (values: Values) => {
    console.log(values);
    await handleSubmit(values);
    method === "add" && form.resetFields();
  };

  const { data: checkListData } = useGetCheckRoomQuery({ roomId });

  const { data, isLoading } = useGetRoomByIdQuery(roomId);

  const roomName = data?.name;
  const departmentName = data?.department?.name;
  const year = data?.year;

  const canEditIsPass = authClient(
    [Role.Admin, Role.TeacherL1],
    session?.user?.type!
  );

  const canEditStudentIsPass = authClient(
    [Role.Admin, Role.TeacherL2],
    session?.user?.type!
  );

  // initialValues checkStudent to Object for lookup
  const initCheckObject = initialValues?.checkStudent?.reduce(
    (obj, item) => ({
      ...obj,
      [item.userId]: { isPass: item.isPass, remark: item?.remark },
    }),
    {}
  ) as {
    remark: any;
    isPass: any;
  }[];

  // base student list
  const checkStudent = data?.user?.map((item) => ({
    userId: item.id,
    name: item.f_name + " " + item.l_name,
    isPass: initCheckObject?.[item.id]?.isPass,
    remark: initCheckObject?.[item.id]?.remark,
  }));

  const date = initialValues?.date ? dayjs(initialValues?.date) : undefined;

  const title = !roomId ? "เพิ่ม" : "แก้ไข";

  return (
    <Card
      title={
        <Space>
          {title}
          {roomName}
          {departmentName}
        </Space>
      }
      loading={loading || isLoading}
    >
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 800 }}
        initialValues={{
          ...initialValues,
          date: date,
          checkStudent: checkStudent,
          year,
        }}
      >
        <Form.Item name="isPass" label="สำหรับครูปกครอง">
          <Select disabled={!canEditIsPass} options={AppStatus} />
        </Form.Item>
        <Form.Item name="date" label="วันที่ตรวจ" rules={[{ required: true }]}>
          <DatePicker
            disabled={method === "update"}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="year"
          label="ชั้นการศึกษา"
          rules={[{ required: true }]}
        >
          <Select disabled options={yearOption} />
        </Form.Item>
        <Form.Item name="term" label="เทอม" rules={[{ required: true }]}>
          <Select
            onChange={() => form.setFieldValue("time", undefined)}
            disabled={method === "update"}
            options={TermOption}
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="ครั้ง"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const selectTerm = getFieldValue("term");
                const selectYear = getFieldValue("year");
                const isNotDuplicateTerm = !checkListData?.find(
                  (item) =>
                    item.term === selectTerm &&
                    item.time === value &&
                    item.year === selectYear
                );

                if (!value || isNotDuplicateTerm || method === "update") {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("เลือกเทอมกับครั้งที่ถูกตรวจไปแล้ว")
                );
              },
            }),
          ]}
        >
          <Select disabled={method === "update"} options={TimeOption} />
        </Form.Item>

        <Row gutter={[16, 16]} style={{ paddingBottom: 16 }}>
          <Col md={{ offset: 6, span: 18 }}>
            <Table
              rowKey={"userId"}
              pagination={false}
              columns={[
                {
                  title: "ชื่อ",
                  key: "name",
                  dataIndex: "name",
                },
                {
                  title: "สถานะ",
                  key: "isPass",
                  dataIndex: "isPass",
                  width: "30%",
                  render: (value, _, index) => {
                    return (
                      <>
                        <Form.Item
                          noStyle
                          hidden
                          name={["checkStudent", index, "userId"]}
                          label="id"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          noStyle
                          name={["checkStudent", index, "isPass"]}
                          label=""
                          rules={[{ required: true }]}
                        >
                          <Select
                            disabled={!canEditStudentIsPass}
                            style={{ width: "200px" }}
                            options={StatusOption}
                          ></Select>
                        </Form.Item>
                      </>
                    );
                  },
                },
                {
                  title: "หมายเหตุ",
                  key: "name",
                  dataIndex: "name",
                  render: (value, _, index) => {
                    return (
                      <>
                        <Form.Item
                          noStyle
                          name={["checkStudent", index, "remark"]}
                          label=""
                        >
                          <Input />
                        </Form.Item>
                      </>
                    );
                  },
                },
              ]}
              dataSource={checkStudent}
            />
          </Col>
        </Row>

        <Form.Item {...tailLayout}>
          <Space>
            <Link href={`check-list/${roomId}/room`}>
              <Button type="default">ย้อนกลับ</Button>
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
