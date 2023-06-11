import { Descriptions, Card, Space } from "antd";

import { useSession } from "next-auth/react";
import { useGetUserByIdQuery } from "@/app/user/service";
import { useGetRoomByIdQuery } from "@/app/room/service";

import { yearOption } from "../Room/constants";

const Info = () => {
  const { data: session } = useSession();
  const userId = +session?.user?.id!;

  const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });

  const roomId = +user?.roomId!;
  const { data: room } = useGetRoomByIdQuery(roomId, { skip: !roomId });

  const teacherId = +room?.teacherId!;

  const { data: teacher } = useGetUserByIdQuery(teacherId, {
    skip: !teacherId,
  });

  return (
    <Card title="ข้อมูลส่วนตัว">
      <Descriptions layout="vertical" column={1}>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="ชื่อ-สกุล">
          {user?.f_name} {user?.l_name}
        </Descriptions.Item>
        <Descriptions.Item label="แผนก / ชั้นการศีกษา / เทอม">
          <Space>
            {room?.department?.name}/
            {yearOption?.find((item) => item.value === room?.year)?.label}/
            {room?.term}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="ครูประจำชั้น">
          {teacher?.f_name} {teacher?.l_name}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Info;
