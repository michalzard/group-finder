import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  userRegister,
  userSession,
  userUpdate,
} from "../reducers/userReducers";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: {},
    isLoggedIn: true,
    loading: false,
    error: "",
    success: "",
    feedback: {
      open: false,
      message: "",
      type: "",
    },
  },
  reducers: {
    clearFeedback: (state) => {
      state.feedback.open = false;
      state.feedback.message = "";
      state.feedback.type = "";
    },
    updateUser: (state, { payload }) => {
      const { updated } = payload; //new user state
      state.user = updated;
    },
  },
  extraReducers: {
    //userLogin
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      const { message, ...user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.error = "";
      state.success = message;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = "";
    },
    //userSession
    [userSession.pending]: (state) => {
      state.loading = true;
    },
    [userSession.fulfilled]: (state, action) => {
      state.loading = false;
      const { message, user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.error = "";
      state.success = message;
    },
    [userSession.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.success = "";
    },
    //userLogout
    [userLogout.pending]: (state) => {
      state.loading = true;
    },
    [userLogout.fulfilled]: (state, action) => {
      state.loading = false;
      const { message } = action.payload;
      state.success = message;
      state.user = {};
      state.error = "";
      state.isLoggedIn = false;
    },
    [userLogout.rejected]: (state, action) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    },
    //userRegister
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      const { user, message } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.success = message;
      state.error = "";
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    [userUpdate.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [userUpdate.fulfilled]: (state, { payload }) => {
      state.loading = true;
      const { message, user } = payload;
      state.user = user;
      state.feedback = {
        open: true,
        message,
        type: "success",
      };
    },
    [userUpdate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.feedback = {
        open: true,
        message: payload,
        type: "error",
      };
    },
  },
});
export const { clearFeedback, updateUser } = authSlice.actions;
export default authSlice.reducer;
