import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import chatSlice from "./slices/chatSlice";
import friendsSlice from "./slices/friendsSlice";
import profileCreateSlice from "./slices/profileCreation";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    chat: chatSlice,
    profileCreator: profileCreateSlice,
  },
});
