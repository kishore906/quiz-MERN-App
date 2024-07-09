import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query(body) {
        return {
          url: "/signUp",
          method: "POST",
          body,
        };
      },
    }),

    signIn: builder.mutation({
      query(body) {
        return {
          url: "/signIn",
          method: "POST",
          body,
        };
      },
    }),

    signOut: builder.query({
      query: () => "/signOut",
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLazySignOutQuery } =
  authApi;
