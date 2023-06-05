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

import { useGetRoomByIdQuery } from "@/app/room/service";
import { useGetCheckRoomQuery } from "@/app/check-list/service";

import {
  StatusOption,
  TermOption,
  TimeOption,
} from "@/components/CheckList/constants";

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
  checkStudent: { userId: number; isPass: boolean }[];
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

  const onFinish = async (values: Values) => {
    console.log(values);
    await handleSubmit(values);
    method === "add" && form.resetFields();
  };

  const { data: checkListData } = useGetCheckRoomQuery({});

  console.log({ checkListData });

  const { data, isLoading } = useGetRoomByIdQuery(roomId);

  const roomName = data?.name;
  const departmentName = data?.department?.name;

  // initialValues checkStudent to Object for lookup
  const initCheckObject = initialValues?.checkStudent?.reduce(
    (obj, item) => ({ ...obj, [item.userId]: item.isPass }),
    {}
  ) as { [key: number]: boolean }[];

  // base student list
  const checkStudent = data?.user?.map((item) => ({
    userId: item.id,
    name: item.f_name + " " + item.l_name,
    isPass: initCheckObject?.[item.id],
  }));

  const date = dayjs(initialValues?.date);

  return (
    <Card
      title={
        <>
          <Link href={`check-list/${roomId}/room`}>กลับ</Link> เพิ่ม
          {roomName} {departmentName}
        </>
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
        }}
      >
        <Form.Item name="isPass" label="สำหรับครูปกครอง">
          <Select disabled options={StatusOption} />
        </Form.Item>
        <Form.Item name="date" label="วันที่ตรวจ" rules={[{ required: true }]}>
          <DatePicker
            disabled={method === "update"}
            style={{ width: "100%" }}
          />
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
          label="ครั้งที่"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const selectTerm = getFieldValue("term");
                const isNotDuplicateTerm = !checkListData?.find(
                  (item) => item.term === selectTerm && item.time === value
                );

                if (!value || isNotDuplicateTerm) {
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
                  title: "name",
                  key: "name",
                  dataIndex: "name",
                },
                {
                  title: "Status",
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
                            style={{ width: "200px" }}
                            options={StatusOption}
                          ></Select>
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

        {/* {checkStudent?.map((item, index) => {
          return (
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
              key={item.userId}
            >
              <Form.Item
                name={["checkStudent", index, "userId"]}
                label="id"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["checkStudent", index, "isPass"]}
                label="สถานะ"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "200px" }}
                  options={StatusOption}
                ></Select>
              </Form.Item>
            </Space>
          );
        })} */}

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
