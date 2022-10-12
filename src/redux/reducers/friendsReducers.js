import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

export const PendingFriendsRequests = createAsyncThunk(
    "Friends/PendingRequestLoad",async(_,thunkApi)=>{
    return await axios.get(`${API_URL}/friends/requests`,{withCredentials:true}).then(data=>{
            const {message,requests} = data.data;
            return {message,requests};
        }).catch(err=>{
            return thunkApi.rejectWithValue(err.response.data.message);
        })
    }
)