import { createSlice } from "@reduxjs/toolkit";
import {
  LoadStoredChatMessages,
  StoreChatMessage,
} from "../reducers/chatReducers";

const chatSlice = createSlice({
  name: "Chat",
  initialState: {
    chatBubbleColor:
      localStorage.getItem("chat-bubble-color") || "hsl(212, 47%, 48%)", //chat bubbles from user,load saved first,if none,default blue
    chatMessages: [],
    loading: false,
    error: "",
    success: "",
  },
  reducers: {
    selectChatBubbleColor: (state, { payload }) => {
      state.chatBubbleColor = payload;
      localStorage.setItem("chat-bubble-color", payload);
    },
    addChatMessage: (state, { payload }) => {
      state.chatMessages.push(payload);
    },
    clearChatMessages:(state)=>{
      state.chatMessages = [];
    }
  },
  extraReducers: {
    [LoadStoredChatMessages.pending]: (state) => {
      state.loading = true;
    },
    [LoadStoredChatMessages.fulfilled]: (state, { payload }) => {
      const { message, conversation } = payload;
      state.loading = false;
      state.success = message;
      state.error = "";
      state.chatMessages = conversation;
    },
    [LoadStoredChatMessages.rejected]: (state, { payload }) => {
      const { message } = payload;
      state.loading = false;
      state.error = message;
      state.success = "";
    },
    [StoreChatMessage.pending]: (state) => {
      state.loading = true;
    },
    [StoreChatMessage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload;
      state.error = "";
    },
    [StoreChatMessage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = "";
      state.error = payload;
    },
  },
});

export const { selectChatBubbleColor, addChatMessage,clearChatMessages } = chatSlice.actions;

export default chatSlice.reducer;
