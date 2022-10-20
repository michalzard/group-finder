import {createSlice} from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"Chat",
    initialState:{
        chatBubbleColor:localStorage.getItem("chat-bubble-color") || "hsl(212, 47%, 48%)",//chat bubbles from user,load saved first,if none,default blue
        chatMessages:[],
    },
    reducers:{
        selectChatBubbleColor:(state,{payload})=>{
            state.chatBubbleColor = payload;
            localStorage.setItem("chat-bubble-color",payload);
        },
        addChatMessage:(state,{payload})=>{
            console.log(payload);
            state.chatMessages.push(payload);
        },
    },
});

export const {selectChatBubbleColor,addChatMessage} = chatSlice.actions;

export default chatSlice.reducer;