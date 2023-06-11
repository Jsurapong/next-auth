"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/components/CheckList/Form";

import type { Values } from "@/components/CheckList/Form";
import {
  useUpdateCheckRoomMutation,
  useGetCheckRoomByIdQuery,
} from "@/app/check-list/service";

const FormCreate: React.FC = () => {
  const params = useParams();

  const roomId = +params?.roomId;
  const checkId = +params?.checkId;

  const { data, isFetching } = useGetCheckRoomByIdQuery(+checkId, {
    skip: !checkId,
  });

  const [update, { isLoading }] = useUpdateCheckRoomMutation();

  const handleSubmit = async (values: Values) => {
    await update({ ...values, roomId, id: checkId });
  };

  const initialValues = {
    isPass: data?.isPass,
    term: data?.term,
    time: data?.time,
    date: data?.date?.toString(),
    checkStudent: data?.checkStudent?.map((item) => ({
      userId: item?.user.id,
      isPass: item?.isPass,
      remark: item?.remark ?? undefined,
    })),
  };

  return (
    <Form
      roomId={roomId}
      handleSubmit={handleSubmit}
      submitting={isLoading}
      loading={isFetching}
      initialValues={initialValues}
      method="update"
    />
  );
};

export default FormCreate;
