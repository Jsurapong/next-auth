import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type {
  ReturnDepartment,
  ReturnDepartments,
  ReturnDepartmentCreate,
  ReturnDepartmentUpdate,
  RequestBodyCreate,
  RequestBodyUpdate,
} from "@/app/api/department/controller";

export const departmentApi = createApi({
  reducerPath: "department",
  baseQuery: appBaseQuery,
  tagTypes: ["departments", "department"],
  endpoints: (builder) => ({
    getDepartment: builder.query<ReturnDepartments, {}>({
      query: () => ({ url: "/api/department", method: "GET" }),
      providesTags: ["departments"],
    }),
    deleteDepartment: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/api/department/${id}`, method: "DELETE" }),
      invalidatesTags: ["departments"],
    }),
    createDepartment: builder.mutation<
      ReturnDepartmentCreate,
      RequestBodyCreate
    >({
      query: (data) => ({ url: "/api/department", data, method: "POST" }),
    }),
    getDepartmentById: builder.query<ReturnDepartment, number>({
      query: (id) => ({ url: `/api/department/${id}`, method: "GET" }),
      providesTags: ["department"],
    }),
    updateDepartment: builder.mutation<
      ReturnDepartmentUpdate,
      RequestBodyUpdate & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `/api/department/${id}`,
        data,
        method: "PUT",
      }),
      invalidatesTags: ["department", "departments"],
    }),
  }),
});

export const {
  useGetDepartmentQuery,
  useDeleteDepartmentMutation,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentByIdQuery,
} = departmentApi;
