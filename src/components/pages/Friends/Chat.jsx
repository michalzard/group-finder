import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFriendById } from '../../../redux/slices/friendsSlice';
import "./Chat.scss";

function Chat({socket}) {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {list,currentFriend} = useSelector(state=>state.friends);
  const {user} = useSelector(state=>state.auth);
  useEffect(()=>{
    //if user loaded /friends/dm/id directly
    if(list.length > 0)dispatch(setFriendById({id}));  
  },[list,dispatch,id]);

  useEffect(()=>{
    if(!socket) return;
    socket.on("DM_RECEIVED",data=>{
      setMsgs(prev=>[...prev,data]);
    });
  },[socket]);
  
  const [msgs,setMsgs] = useState([]);
  const sendDirectMessage=()=>{
    console.log("attempted to send dm");
    socket.emit("DIRECT_MESSAGE",{message:`[${user.username}] : testing message`,to:currentFriend.id});
  }


  return (
    <div className="private-chat">
    <Typography>Chatting with ... </Typography>
    {/* Lighter top bar with avatar + name ,status on right */}
    <section className="user-info">
    <Avatar/> {currentFriend.username}
    </section>
    {/* +personIcon You're now chatting with {username}! */}
    {/* --------Date when message was sent ------ */}
    <Button onClick={sendDirectMessage}>Testing DMS</Button>
    <Typography>Debugging messages</Typography>
    {
      msgs.map(response=>{if(response.username === currentFriend.username)return <Typography>{response.message}</Typography>})
    }
    </div>

  )
}

export default Chat;