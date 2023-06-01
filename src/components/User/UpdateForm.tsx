"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/components/User/Form";

import type { Values } from "@/components/User/Form";
import { useUpdateUserMutation, useGetUserByIdQuery } from "@/app/user/service";

const FormCreate: React.FC = () => {
  const params = useParams();

  const id = params?.id;

  const { data, isFetching } = useGetUserByIdQuery(+id, { skip: !id });

  const [update, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (values: Values) => {
    await update(values);
  };

  const initialValues = {
    email: data?.email,
    f_name: data?.f_name,
    id: data?.id,
    l_name: data?.l_name,
    roomId: data?.roomId ?? undefined,
    type: data?.type,
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
