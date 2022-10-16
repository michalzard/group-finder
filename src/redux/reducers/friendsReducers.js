import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const LoadAllFriends = createAsyncThunk(
    "Friends/All",async(_,thunkApi)=>{
        return await axios.get(`${process.env.REACT_APP_API_URL}/friends`,{withCredentials:true}).then(data=>{
            const {message,friends} = data.data;
            return {message,friends};
        }).catch(err=>{
            return thunkApi.rejectWithValue(err.response.data.message);
        })
    }
)

export const AddFriend = createAsyncThunk(
    "Friends/Add",async({username},thunkApi)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/friends/request`,{username},{withCredentials:true}).then(data=>{
        const {message} = data.data;
        return {message}
    }).catch(err=>{
        return thunkApi.rejectWithValue(err.response.data.message);
    })
    }
)

export const PendingFriendsRequests = createAsyncThunk(
    "Friends/PendingRequestLoad",async(_,thunkApi)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/friends/requests`,{withCredentials:true}).then(data=>{
            const {message,requests} = data.data;
            return {message,requests};
        }).catch(err=>{
            return thunkApi.rejectWithValue(err.response.data.message);
        })
    }
)

export const AcceptFriendRequest = createAsyncThunk(
    "Friends/AcceptFriendRequest",async({requesterId},thunkApi)=>{
    return await axios.patch(`${process.env.REACT_APP_API_URL}/friends/accept`,{requesterId},{withCredentials:true}).then(data=>{
        const {message} = data.data;
        return message; 
    }).catch(err=>{
        return thunkApi.rejectWithValue(err.response.data.message);
    })
    }
)

export const DeclineFriendRequest = createAsyncThunk(
    "Friends/DeclineFriendRequest",async({requesterId},thunkApi)=>{
    return await axios.patch(`${process.env.REACT_APP_API_URL}/friends/decline`,{requesterId},{withCredentials:true}).then(data=>{
        const {message} = data.data;
        return message; 
    }).catch(err=>{
        return thunkApi.rejectWithValue(err.response.data.message);
    })
    }
)

export const CancelFriendRequest = createAsyncThunk(
    "Friends/CancelFriendRequest",async({recipientId},thunkApi)=>{
    return await axios.patch(`${process.env.REACT_APP_API_URL}/friends/cancel`,{recipientId},{withCredentials:true}).then(data=>{
        const {message} = data.data;
        return message; 
    }).catch(err=>{
        return thunkApi.rejectWithValue(err.response.data.message);
    })
    }
)