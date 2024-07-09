import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["users"],
    }),

    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
    }),

    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),

    getQuestion: builder.query({
      query: (params) => ({
        url: "/admin/getQuestion",
        params: {
          topic: params?.topic,
          id: params?.id,
        },
      }),
    }),

    getQuestionsByTopic: builder.query({
      query: (topic) => `/getQuestionsByTopic?topic=${topic}`,
    }),

    addQuizQuestions: builder.mutation({
      query(body) {
        return {
          url: "/admin/addNewTopicAndQuestions",
          method: "POST",
          body,
        };
      },
    }),

    updateQuestion: builder.mutation({
      query({ topic, id, body }) {
        return {
          url: `/admin/updateQuestion?topic=${topic}&id=${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    deleteQuestion: builder.mutation({
      query({ topic, id }) {
        return {
          url: `/admin/deleteQuestion?topic=${topic}&id=${id}`,
          method: "DELETE",
        };
      },
    }),

    getAllAdminStats: builder.query({
      query: () => `/admin/getAllAdminStats`,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useLazyGetQuestionsByTopicQuery,
  useDeleteQuestionMutation,
  useGetQuestionQuery,
  useUpdateQuestionMutation,
  useAddQuizQuestionsMutation,
  useGetAllAdminStatsQuery,
} = adminApi;
