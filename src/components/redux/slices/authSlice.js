import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSession } from "../reducers/userReducers";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: {},
    isLoggedIn: false,
    loading: false,
    error: "",
  },
  //   reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      const { message, ...user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.error = message;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [userSession.pending]: (state) => {
      state.loading = true;
    },
    [userSession.fulfilled]: (state, action) => {
      state.loading = false;
      const {message,user} = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.error = message;
    },
    [userSession.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
