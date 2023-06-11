"use client";

import React from "react";
import { useParams } from "next/navigation";

import Form from "@/components/CheckList/Form";
import type { Values } from "@/components/CheckList/Form";
import { useCreateCheckRoomMutation } from "@/app/check-list/service";

const FormCreate: React.FC = () => {
  const [create, { isLoading }] = useCreateCheckRoomMutation();

  const params = useParams();
  const roomId = +params?.roomId;

  const handleSubmit = async (values: Values) => {
    await create({ ...values, roomId });
  };

  return (
    <Form
      roomId={roomId}
      handleSubmit={handleSubmit}
      submitting={isLoading}
      method="add"
    />
  );
};

export default FormCreate;
