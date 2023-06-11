import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "@/lib/axios";

import type { ReturnStudentReport } from "@/app/api/report/student/controller";

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
  }),
});

export const { useGetStudentReportQuery } = reportApi;
