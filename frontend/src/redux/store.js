import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import quizReducer from "./slice/quizSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { adminApi } from "./api/adminApi";

const store = configureStore({
  reducer: {
    auth: userReducer,
    quiz: quizReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware,
    ]),
});

export default store;
