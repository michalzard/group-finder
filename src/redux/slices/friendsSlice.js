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
    requests: [
      { type: "outgoing", requests: [] },
      { type: "pending", requests: [] },
    ],
    loading: false,
    error: "",
    success: "",
    currentFriend: {},
  },
  reducers: {
    setFriendById: (state, { payload }) => {
      const index = state.list.map((friend) => friend.id).indexOf(payload.id);
      if (index !== -1) {
        const friend = state.list[index];
        state.currentFriend = friend;
      }
    },
    removeFriendById: (state, { payload }) => {
      const index = state.list.map((friend) => friend.id).indexOf(payload.id);
      if (index !== -1) state.list.splice(index, 1);
    },
    replaceFriendList: (state, { payload }) => {
      state.list = payload;
    },
    addFriendRequest: (state, { payload }) => {
      // state.requests
      const { request } = payload.data;
      const user = payload.user;
      switch (request.status) {
        case "pending":
          //check if requester is user if yes,push to ongoing else pending
          if (user.id === request.requester.id)
            state.requests[0].requests.push(request);
          else state.requests[1].requests.push(request);
          break;
        default:
          break;
      }
    },
    removeFriendRequest: (state, { payload }) => {
      const { id } = payload;
      const outgoingIndex = state.requests[0].requests
        .map((req) => req.id)
        .indexOf(id);
      const pendingIndex = state.requests[1].requests
        .map((req) => req.id)
        .indexOf(id);

      if (outgoingIndex !== -1) {
        state.requests[0].requests.splice(outgoingIndex, 1);
      } else if (pendingIndex !== -1) {
        state.requests[1].requests.splice(pendingIndex, 1);
      }
    },
  },
  extraReducers: {
    //Friend requests
    [PendingFriendsRequests.pending]: (state) => {
      state.loading = true;
    },
    [PendingFriendsRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requests = payload.requests;
      state.error = "";
    },
    [PendingFriendsRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //All Friends
    [LoadAllFriends.pending]: (state) => {
      state.loading = true;
    },
    [LoadAllFriends.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //expecting friends from payload to be array
      state.list = payload.friends;
      state.error = "";
    },
    [LoadAllFriends.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //Add Friend (Send friend request)
    [AddFriend.pending]: (state) => {
      state.loading = true;
    },
    [AddFriend.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload.message;
      state.error = "";
    },
    [AddFriend.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //Accept Friend Request
    [AcceptFriendRequest.pending]: (state) => {
      state.loading = true;
    },
    [AcceptFriendRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.success = payload;
      //TODO:return a friend object ???
    },
    [AcceptFriendRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
    //Decline Friend Request
    [DeclineFriendRequest.pending]: (state) => {
      state.loading = true;
    },
    [DeclineFriendRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.success = payload;
      //TODO:return a friend object ???
    },
    [DeclineFriendRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = "";
    },
  },
});

export const {
  setFriendById,
  removeFriendById,
  addFriendRequest,
  removeFriendRequest,
  replaceFriendList,
} = friendsSlice.actions;

export default friendsSlice.reducer;
