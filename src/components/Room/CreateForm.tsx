"use client";

import React from "react";

import Form from "@/components/Room/Form";
import type { Values } from "@/components/Room/Form";
import { useCreateRoomMutation } from "@/app/room/service";

const FormCreate: React.FC = () => {
  const [create, { isLoading }] = useCreateRoomMutation();

  const handleSubmit = async (values: Values) => {
    await create(values);
  };

  return (
    <Form handleSubmit={handleSubmit} submitting={isLoading} method="add" />
  );
};

export default FormCreate;
