import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFriendChatId } from '../../../redux/slices/friendsSlice';
import "./Chat.scss";

function Chat({socket}) {
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    //if user loaded /friends/dm/id directly
    dispatch(setFriendChatId({id}));  
  },[id]);

  // const friendId = useSelector(state=>state.friends.friendChatId);

  return (
    <div className="private-chat">
    <Typography>Chatting with ... </Typography>
    {/* Lighter top bar with avatar + name ,status on right */}
    {/* +personIcon You're now chatting with {username}! */}
    {/* --------Date when message was sent ------ */}
    
    </div>

  )
}

export default Chat;