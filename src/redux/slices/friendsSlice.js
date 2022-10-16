import { createSlice } from "@reduxjs/toolkit";
import {
  AcceptFriendRequest,
  AddFriend,
  DeclineFriendRequest,
  LoadAllFriends,
  PendingFriendsRequests,
} from "../reducers/friendsReducers";

const friendsSlice = createSlice({
  name: "Friends",
  initialState: {
    list: [],
    requests: [],
    loading: false,
    error: "",
    success: "",
  },
  extraReducers: {
    //Friend requests
    [PendingFriendsRequests.pending]: (state) => {
      state.loading = true;
    },
    [PendingFriendsRequests.fulfilled]: (state, action) => {
      state.loading = false;
      const { requests } = action.payload;
      state.requests = requests;
      state.error = "";
    },
    [PendingFriendsRequests.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = "";
    },
    //All Friends
    [LoadAllFriends.pending]: (state) => {
      state.loading = true;
    },
    [LoadAllFriends.fulfilled]: (state, action) => {
      state.loading = false;
      const { friends } = action.payload;
      //expecting friends from payload to be array
      state.list = friends;
      state.error = "";
    },
    [LoadAllFriends.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = "";
    },
    //Add Friend (Send friend request)
    [AddFriend.pending]: (state) => {
      state.loading = true;
    },
    [AddFriend.fulfilled]: (state, action) => {
      state.loading = false;
      const { message } = action.payload;
      state.success = message;
      state.error = "";
    },
    [AddFriend.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = "";
    },
    //Accept Friend Request
    [AcceptFriendRequest.pending]: (state) =>{
      state.loading = true;
    },
    [AcceptFriendRequest.fulfilled]: (state,action) =>{
      state.loading=false;
      state.error="";
      state.success = action.payload;
      //TODO:return a friend object ???
    },
    [AcceptFriendRequest.rejected]: (state,action) =>{
      state.loading=false;
      state.error=action.payload;
      state.success = "";
    },
    //Decline Friend Request
    [DeclineFriendRequest.pending]: (state) =>{
      state.loading = true;
    },
    [DeclineFriendRequest.fulfilled]: (state,action) =>{
      state.loading=false;
      state.error="";
      state.success = action.payload;
      //TODO:return a friend object ???
    },
    [DeclineFriendRequest.rejected]: (state,action) =>{
      state.loading=false;
      state.error=action.payload;
      state.success = "";
    }
  },
});

export default friendsSlice.reducer;
