import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type {
  ReturnRoom,
  ReturnRooms,
  ReturnRoomCreate,
  ReturnRoomUpdate,
  RequestBodyCreate,
  RequestBodyUpdate,
} from "@/app/api/room/controller";

export const roomApi = createApi({
  reducerPath: "room",
  baseQuery: appBaseQuery,
  tagTypes: ["rooms", "room"],
  endpoints: (builder) => ({
    getRoom: builder.query<ReturnRooms, {}>({
      query: () => ({ url: "/api/room", method: "GET" }),
      providesTags: ["rooms"],
    }),
    deleteRoom: builder.mutation<unknown, number>({
      query: (id) => ({ url: `/api/room/${id}`, method: "DELETE" }),
      invalidatesTags: ["rooms"],
    }),
    createRoom: builder.mutation<ReturnRoomCreate, RequestBodyCreate>({
      query: (data) => ({ url: "/api/room", data, method: "POST" }),
      invalidatesTags: ["rooms"],
    }),
    getRoomById: builder.query<ReturnRoom, number>({
      query: (id) => ({ url: `/api/room/${id}`, method: "GET" }),
      providesTags: ["room"],
    }),
    updateRoom: builder.mutation<
      ReturnRoomUpdate,
      RequestBodyUpdate & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `/api/room/${id}`,
        data,
        method: "PUT",
      }),
      invalidatesTags: ["room", "rooms"],
    }),
  }),
});

export const {
  useGetRoomQuery,
  useDeleteRoomMutation,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useGetRoomByIdQuery,
} = roomApi;
