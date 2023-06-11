import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type {
  ReturnCheckRoom,
  ReturnCheckRooms,
  ReturnCheckRoomCreate,
  ReturnCheckRoomUpdate,
  RequestBodyCreate,
  RequestBodyUpdate,
} from "@/app/api/checkRoom/controller";

export const checkRoomApi = createApi({
  reducerPath: "checkRoom",
  baseQuery: appBaseQuery,
  tagTypes: ["checkRooms", "checkRoom"],
  endpoints: (builder) => ({
    getCheckRoom: builder.query<ReturnCheckRooms, { roomId: number }>({
      query: (params) => ({ url: "/api/checkRoom", method: "GET", params }),
      providesTags: ["checkRooms"],
    }),
    deleteCheckRoom: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/api/checkRoom/${id}`, method: "DELETE" }),
      invalidatesTags: ["checkRooms"],
    }),
    createCheckRoom: builder.mutation<ReturnCheckRoomCreate, RequestBodyCreate>(
      {
        query: (data) => ({ url: "/api/checkRoom", data, method: "POST" }),
        invalidatesTags: ["checkRooms"],
      }
    ),
    getCheckRoomById: builder.query<ReturnCheckRoom, number>({
      query: (id) => ({ url: `/api/checkRoom/${id}`, method: "GET" }),
      providesTags: ["checkRoom"],
    }),
    updateCheckRoom: builder.mutation<
      ReturnCheckRoomUpdate,
      RequestBodyUpdate & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `/api/checkRoom/${id}`,
        data,
        method: "PUT",
      }),
      invalidatesTags: ["checkRoom", "checkRooms"],
    }),
  }),
});

export const {
  useGetCheckRoomQuery,
  useDeleteCheckRoomMutation,
  useCreateCheckRoomMutation,
  useUpdateCheckRoomMutation,
  useGetCheckRoomByIdQuery,
} = checkRoomApi;
