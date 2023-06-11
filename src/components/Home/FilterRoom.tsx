import React, { useCallback } from "react";
import { Card, Select, Space } from "antd";
import { useGetRoomQuery } from "@/app/room/service";
import { useSession } from "next-auth/react";

import { yearOption } from "../Room/constants";
import { Role } from "@/lib/types/role";

const FilterRoom: React.FC<{
  onChange: (value: number | undefined) => void;
}> = ({ onChange }) => {
  const [selected, setSelected] = React.useState<number | undefined>();

  const { data, isFetching } = useGetRoomQuery({});

  const { data: session } = useSession();

  const userId = session?.user.id;
  const type = session?.user.type;

  const options = data
    ?.filter(
      (item) =>
        item.teacherId === userId ||
        type === Role.Admin ||
        type === Role.TeacherL1
    )
    ?.map((item) => {
      const name = item.name;
      const year = yearOption?.find((y) => y.value === item.year)?.label;
      const department = item.department.name;

      const fullName = name + " " + year + " " + department;

      return { label: fullName, value: item.id };
    });

  const handleOnChange = useCallback(
    (value: number | undefined) => {
      onChange(value);
      setSelected(value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (options && !selected) {
      handleOnChange(options?.[0]?.value);
    }
  }, [handleOnChange, options, selected]);

  return (
    <Card>
      <Space>
        ห้อง
        <Select
          value={selected}
          onChange={(value: number | undefined) => {
            handleOnChange(value);
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
