import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/getUser",
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/updateProfile",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/updatePassword",
          method: "PUT",
          body,
        };
      },
    }),

    quizAttempted: builder.mutation({
      query(body) {
        return {
          url: "/quiz",
          method: "PUT",
          body,
        };
      },
    }),

    getAllQuizzess: builder.query({
      query: (params) => ({
        url: "/getAllQuizzess",
        params: {
          page: params?.page,
        },
      }),
    }),

    getUserStats: builder.query({
      query: () => "/getUserStats",
    }),

    getUserPerformanceStats: builder.query({
      query: () => "/getUserPerformanceStats",
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
  useQuizAttemptedMutation,
  useGetAllQuizzessQuery,
  useGetUserStatsQuery,
  useGetUserPerformanceStatsQuery,
} = userApi;
