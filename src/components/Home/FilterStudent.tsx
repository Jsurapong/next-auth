import React, { useCallback } from "react";
import { Card, Select, Space } from "antd";

import { usePrevious } from "@react-hooks-library/core";

import { useGetUserQuery } from "@/app/user/service";

const FilterStudent: React.FC<{
  onChange: (value: number | undefined) => void;
  roomId: number;
}> = ({ onChange, roomId }) => {
  const [selected, setSelected] = React.useState<number | undefined>();
  const previousRoomId = usePrevious(roomId);

  const { data, isFetching } = useGetUserQuery({}, { skip: !roomId });

  const options = data
    ?.filter((item) => item.roomId === roomId)
    ?.map((item) => ({
      label: item.f_name + " " + item.l_name,
      value: item.id,
    }));

  const handleOnChange = useCallback(
    (value: number | undefined) => {
      onChange(value);
      setSelected(value);
      console.log({ value });
    },
    [onChange]
  );

  React.useEffect(() => {
    if (previousRoomId !== roomId) {
      handleOnChange(undefined);
    }
  }, [roomId]);

  return (
    <Card>
      <Space>
        รายขื่อนักเรียน
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

export default FilterStudent;
