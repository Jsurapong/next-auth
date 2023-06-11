import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type { ReturnStudentReport } from "@/app/api/report/student/controller";
import type { ReturnRoomReport } from "@/app/api/report/room/controller";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: appBaseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getStudentReport: builder.query<ReturnStudentReport, number>({
      query: (userId) => ({
        url: "/api/report/student",
        method: "GET",
        params: { userId },
      }),
    }),
    getRoomReport: builder.query<ReturnRoomReport, number>({
      query: (roomId) => ({
        url: "/api/report/room",
        method: "GET",
        params: { roomId },
      }),
    }),
  }),
});

export const { useGetStudentReportQuery, useGetRoomReportQuery } = reportApi;
