import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LoadStoredChatMessages = createAsyncThunk(
  "Chat/LoadMessages",
  async ({recipientId}, thunkApi) => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/chat/messages?recipientId=${recipientId}`,{withCredentials:true})
      .then((data) => {
        const { message, conversation } = data.data;
        return { message, conversation };
      })
      .catch((err) => {
        return thunkApi.rejectWithValue(err.response.data.message);
      });
  }
);
