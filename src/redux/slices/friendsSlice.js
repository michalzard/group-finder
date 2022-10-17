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
    currentFriend:{},
  },
  reducers:{
    setFriendById:(state,{payload})=>{
    const index = state.list.map(friend=>friend.id).indexOf(payload.id);
    const friend = state.list[index];
    state.currentFriend = friend;
    },
  },
  extraReducers: {
    //Friend requests
    [PendingFriendsRequests.pending]: (state) => {
      state.loading = true;
    },
    [PendingFriendsRequests.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.requests = payload.requests;
      state.error = "";
    },
    [PendingFriendsRequests.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = {payload}.payload;
      state.success = "";
    },
    //All Friends
    [LoadAllFriends.pending]: (state) => {
      state.loading = true;
    },
    [LoadAllFriends.fulfilled]: (state, {payload}) => {
      state.loading = false;
      //expecting friends from payload to be array
      state.list = payload.friends;
      state.error = "";
    },
    [LoadAllFriends.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //Add Friend (Send friend request)
    [AddFriend.pending]: (state) => {
      state.loading = true;
    },
    [AddFriend.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = payload.message;
      state.error = "";
    },
    [AddFriend.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //Accept Friend Request
    [AcceptFriendRequest.pending]: (state) =>{
      state.loading = true;
    },
    [AcceptFriendRequest.fulfilled]: (state,{payload}) =>{
      state.loading=false;
      state.error="";
      state.success = payload;
      //TODO:return a friend object ???
    },
    [AcceptFriendRequest.rejected]: (state,{payload}) =>{
      state.loading=false;
      state.error=payload;
      state.success = "";
    },
    //Decline Friend Request
    [DeclineFriendRequest.pending]: (state) =>{
      state.loading = true;
    },
    [DeclineFriendRequest.fulfilled]: (state,{payload}) =>{
      state.loading=false;
      state.error="";
      state.success = payload;
      //TODO:return a friend object ???
    },
    [DeclineFriendRequest.rejected]: (state,{payload}) =>{
      state.loading=false;
      state.error=payload;
      state.success = "";
    }
  },
});

export const {setFriendById} = friendsSlice.actions;

export default friendsSlice.reducer;
