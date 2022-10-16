import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout, userRegister, userSession } from "../reducers/userReducers";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: {},
    isLoggedIn: true,
    loading: false,
    error: "",
    success: "",
  },
  //   reducers: {},
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
    [userRegister.fulfilled]: (state,action) => {
      state.loading = false;
      const {user,message} = action.payload;
      state.isLoggedIn=true;
      state.user = user;
      state.success=message;
      state.error="";
    },
    [userRegister.rejected]: (state,action) => {
      state.loading = false;
      state.isLoggedIn=false;
      state.error = action.payload;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
