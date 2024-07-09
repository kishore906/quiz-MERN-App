import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logOut(state, action) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
