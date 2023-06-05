"use client";

import React from "react";

import Form from "@/components/CheckList/Form";
import type { Values } from "@/components/CheckList/Form";
import { useCreateUserMutation } from "@/app/check-list/service";

const FormCreate: React.FC = () => {
  const [create, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (values: Values) => {
    // await create(values);

    console.log({ values });
  };

  return (
    <Form handleSubmit={handleSubmit} submitting={isLoading} method="add" />
  );
};

export default FormCreate;
