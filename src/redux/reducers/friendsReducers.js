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

export const LoadAllFriends = createAsyncThunk(
    "Friends/All",async(_,thunkApi)=>{
        return await axios.get(`${API_URL}/friends`,{withCredentials:true}).then(data=>{
            const {message,friends} = data.data;
            return {message,friends};
        }).catch(err=>{
            return thunkApi.rejectWithValue(err.response.data.message);
        })
    }
)

export const AddFriend = createAsyncThunk(
    "Friends/Add",async({username},thunkApi)=>{
    return await axios.post(`${API_URL}/friends/request`,{username},{withCredentials:true}).then(data=>{
        const {message} = data.data;
        return {message}
    }).catch(err=>{
        return thunkApi.rejectWithValue(err.response.data.message);
    })
    }
)