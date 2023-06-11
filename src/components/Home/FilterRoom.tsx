import React from "react";
import { Card, Select, Space } from "antd";
import { useGetRoomQuery } from "@/app/room/service";
import { useSession } from "next-auth/react";

import { yearOption } from "../Room/constants";
import { Role } from "@/lib/types/role";

const FilterRoom: React.FC<{
  onChange: (value: number | undefined) => void;
}> = ({ onChange }) => {
  const { data, isFetching } = useGetRoomQuery({});

  const { data: session } = useSession();

  const userId = session?.user.id;
  const type = session?.user.type;

  const options = data
    ?.filter((item) => item.teacherId === userId || type === Role.Admin)
    ?.map((item) => {
      const name = item.name;
      const year = yearOption?.find((y) => y.value === item.year)?.label;
      const department = item.department.name;

      const fullName = name + " " + year + " " + department;

      return { label: fullName, value: item.id };
    });

  return (
    <Card>
      <Space>
        ห้อง
        <Select
          onChange={(value: number | undefined) => {
            onChange(value);
          }}
          loading={isFetching}
          options={options}
          style={{ minWidth: "300px" }}
        />
      </Space>
    </Card>
  );
};

export default FilterRoom;
