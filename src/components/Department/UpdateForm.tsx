"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/components/Department/Form";
import type { Values } from "@/components/Department/Form";
import {
  useUpdateDepartmentMutation,
  useGetDepartmentByIdQuery,
} from "@/app/department/service";

const FormCreate: React.FC = () => {
  const params = useParams();

  const id = params?.id;

  const { data, isFetching } = useGetDepartmentByIdQuery(+id, { skip: !id });

  const [update, { isLoading }] = useUpdateDepartmentMutation();

  const handleSubmit = async (values: Values) => {
    await update({ ...values, id: +id });
  };

  const initialValues = {
    name: data?.name,
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
