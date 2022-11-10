import {createSlice} from "@reduxjs/toolkit";
import { LoadStoredChatMessages } from "../reducers/chatReducers";


const chatSlice = createSlice({
    name:"Chat",
    initialState:{
        chatBubbleColor:localStorage.getItem("chat-bubble-color") || "hsl(212, 47%, 48%)",//chat bubbles from user,load saved first,if none,default blue
        chatMessages:[],
        loading:false,
        error:"",
        success:"",
    },
    reducers:{
        selectChatBubbleColor:(state,{payload})=>{
            state.chatBubbleColor = payload;
            localStorage.setItem("chat-bubble-color",payload);
        },
        addChatMessage:(state,{payload})=>{
            state.chatMessages.push(payload);
        },
    },
    extraReducers:{
    [LoadStoredChatMessages.pending]:(state)=>{
        state.loading = true;
    },
    [LoadStoredChatMessages.fulfilled]:(state,{payload})=>{
        const {message,conversation} = payload;
        state.loading = false;
        state.success = message;
        state.error = "";
        state.chatMessages = conversation;
    },
    [LoadStoredChatMessages.rejected]:(state,{payload})=>{
        const {message} = payload;
        state.loading = false;
        state.error = message;
        state.success =""
    },
    }
});

export const {selectChatBubbleColor,addChatMessage} = chatSlice.actions;

export default chatSlice.reducer;