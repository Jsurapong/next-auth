import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from "axios";

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    (request.headers as AxiosHeaders).set(
      "authorization",
      `${session.user.accessToken}`
    );
  }
  return request;
});

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const appBaseQuery = axiosBaseQuery();
