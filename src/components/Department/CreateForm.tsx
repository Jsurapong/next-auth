"use client";

import React from "react";

import Form from "@/components/Department/Form";
import type { Values } from "@/components/Department/Form";
import { useCreateDepartmentMutation } from "@/app/department/service";

const FormCreate: React.FC = () => {
  const [create, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async (values: Values) => {
    await create(values);
  };

  return (
    <Form handleSubmit={handleSubmit} submitting={isLoading} method="add" />
  );
};

export default FormCreate;
