import { createSlice } from "@reduxjs/toolkit";
import { PendingFriendsRequests } from "../reducers/friendsReducers";

const friendsSlice = createSlice({
  name: "Friends",
  initialState: {
    friends: [],
    requests: [],
    loading: false,
    error: "",
    success: "",
  },
  extraReducers: {
    [PendingFriendsRequests.pending]: (state, action) => {
      state.loading = true;
    },
    [PendingFriendsRequests.fulfilled]: (state, action) => {
      state.loading = false;
      const { message, requests } = action.payload;
      state.requests = requests;
      state.success = message;
    },
    [PendingFriendsRequests.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default friendsSlice.reducer;
