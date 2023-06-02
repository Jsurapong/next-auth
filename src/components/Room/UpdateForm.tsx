"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/components/Room/Form";
import type { Values } from "@/components/Room/Form";
import { useUpdateRoomMutation, useGetRoomByIdQuery } from "@/app/room/service";

const FormCreate: React.FC = () => {
  const params = useParams();

  const id = params?.id;

  const { data, isFetching } = useGetRoomByIdQuery(+id, { skip: !id });

  const [update, { isLoading }] = useUpdateRoomMutation();

  const handleSubmit = async (values: Values) => {
    await update({ ...values, id: +id });
  };

  const initialValues = {
    name: data?.name,
    teacherId: data?.teacherId,
    departmentId: data?.departmentId,
    term: data?.term,
    year: data?.year,
    users: data?.user?.map((item) => item.id),
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      submitting={isLoading}
      loading={isFetching}
      initialValues={initialValues}
      method="update"
    />
  );
};

export default FormCreate;
