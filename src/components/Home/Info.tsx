import React from "react";
import { Descriptions, Card, Space } from "antd";

import { useGetUserByIdQuery } from "@/app/user/service";
import { useGetRoomByIdQuery } from "@/app/room/service";

import { roleOptions } from "../User/constants";
import { yearOption } from "../Room/constants";

const Info: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, isFetching: isFetchingUser } = useGetUserByIdQuery(
    userId,
    { skip: !userId }
  );

  const roomId = +user?.roomId!;
  const { data: room, isFetching: isFetchingRoom } = useGetRoomByIdQuery(
    roomId,
    { skip: !roomId }
  );

  const teacherId = +room?.teacherId!;
  const { data: teacher, isFetching: isFetchingTeacher } = useGetUserByIdQuery(
    teacherId,
    { skip: !teacherId }
  );

  return (
    <Card title="ข้อมูลส่วนตัว" loading={isFetchingUser}>
      <Descriptions layout="vertical" column={1}>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="ชื่อ-สกุล">
          {user?.f_name} {user?.l_name}
        </Descriptions.Item>
        <Descriptions.Item label="ตำแหน่ง">
          {roleOptions?.find((item) => item.value === user?.type)?.label}
        </Descriptions.Item>

        {room && (
          <Descriptions.Item label="แผนก / ชั้นการศีกษา / เทอม">
            <Space>
              {room?.department?.name}/
              {yearOption?.find((item) => item.value === room?.year)?.label}/
              {room?.term}
            </Space>
          </Descriptions.Item>
        )}
        {teacher && (
          <Descriptions.Item label="ครูประจำชั้น">
            {teacher?.f_name} {teacher?.l_name}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
};

export default Info;
