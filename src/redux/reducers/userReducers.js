import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "Auth/Login",
  async ({ username, password }, thunkApi) => {
    return await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password },{withCredentials:true})
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
      .get(`${process.env.REACT_APP_API_URL}/auth/session`,{withCredentials:true})
      .then((data) => {
        const {message,user} = data.data;
        return {message,user};
      })
      .catch((err) => {
        return thunkApi.rejectWithValue(err.response.data.message);
      });
  }
);

export const userRegister = createAsyncThunk(
  "Auth/Register",
  async ({email,username,password},thunkApi) =>{
    // return register logic
    return await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{email,username,password},{withCredentials:true})
    .then((data)=>{
      const {message,user} = data.data;
      console.log(data);
      return {message,user};
    }).catch(err=>{console.log(err);return thunkApi.rejectWithValue(err.response.data.message)});
  }
);


export const userLogout = createAsyncThunk(
  "Auth/Logout", async(_,thunkApi) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`,{withCredentials:true})
    .then(data=>{return data.data}).catch(err=>{return thunkApi.rejectWithValue(err.response.data.message);})
  }
)
