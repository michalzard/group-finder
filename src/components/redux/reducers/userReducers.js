import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

export const userLogin = createAsyncThunk(
  "Auth/Login",
  async ({ username, password }, thunkApi) => {
    return await axios
      .post(`${API_URL}/auth/login`, { username, password },{withCredentials:true})
      .then((data) => {
        const { message, user } = data.data;
        const { email, username, id } = user;
        //this ends as payload
        return { message, username, email, id };
      })
      .catch((err) => {
        return thunkApi.rejectWithValue(err.response.data.message);
      });
  }
);

export const userSession = createAsyncThunk(
  "Auth/Session",
  async (_, thunkApi) => {
    return await axios
      .get(`${API_URL}/auth/session`,{withCredentials:true})
      .then((data) => {
        console.log(data);
        const {message,user} = data.data;
        return {message,user};
      })
      .catch((err) => {
        return thunkApi.rejectWithValue(err.response.data.message);
      });
  }
);
