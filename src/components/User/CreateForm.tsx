"use client";

import React from "react";
import Form from "@/components/User/Form";

import type { Values } from "@/components/User/Form";
import { useCreateUserMutation } from "@/app/user/service";

const FormCreate: React.FC = () => {
  const [create, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (values: Values) => {
    await create(values);
  };

  return (
    <Form handleSubmit={handleSubmit} submitting={isLoading} method="add" />
  );
};

export default FormCreate;
