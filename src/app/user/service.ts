import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type { ReturnUserCreate, ReturnUsers } from "@/app/api/user/controller";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: appBaseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query<ReturnUsers, {}>({
      query: () => ({ url: "/api/user", method: "GET" }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/api/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, useDeleteUserMutation } = userApi;
