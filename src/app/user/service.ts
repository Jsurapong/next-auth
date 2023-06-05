import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type {
  ReturnUsers,
  ReturnUser,
  ReturnUserCreate,
  RequestBodyCreate,
  RequestBodyUpdate,
} from "@/app/api/user/controller";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: appBaseQuery,
  tagTypes: ["users", "user"],
  endpoints: (builder) => ({
    getUser: builder.query<ReturnUsers, {}>({
      query: () => ({ url: "/api/user", method: "GET" }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/api/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["users"],
    }),
    createUser: builder.mutation<ReturnUserCreate, RequestBodyCreate>({
      query: (data) => ({ url: "/api/user", data, method: "POST" }),
      invalidatesTags: ["users"],
    }),
    getUserById: builder.query<ReturnUser, number>({
      query: (id) => ({ url: `/api/user/${id}`, method: "GET" }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<
      ReturnUserCreate,
      RequestBodyUpdate & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `/api/user/${id}`,
        data,
        method: "PUT",
      }),
      invalidatesTags: ["user", "users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = userApi;
