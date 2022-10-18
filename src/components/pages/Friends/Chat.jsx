import { Avatar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFriendById } from '../../../redux/slices/friendsSlice';
import "./Chat.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';




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
      //userId,message itself,to <- id for comparison
      setChatMessages(prev=>[...prev,data]);
    });
  },[socket]);
  
  const [chatMessages,setChatMessages] = useState([]);
  //from chatbox
  const [newChatMessage,setNewChatMessage] = useState("");
  
  const sendDirectMessage=()=>{
    if(newChatMessage.length > 0){
      socket.emit("DIRECT_MESSAGE",{content:newChatMessage,to:currentFriend.id});
      setChatMessages(prev=>[...prev,{userId:user.id,content:newChatMessage,to:currentFriend.id}])
      setNewChatMessage("");
    }
  }
  

  return (
    <div className="private-chat">
    {/* Lighter top bar with avatar + name ,status on right */}
    <section className="chat-header">
    <section className="user-info"><Avatar/> <Typography variant="h5">{currentFriend.username}</Typography>
    {/* show online/offline circle */}
    </section>
    {/* onclick open menu */}
    <MoreVertIcon className="chat-open-more"/>
    </section>

    <section className="chat-messages-container">
    
    <section className="chat-messages">

    <section className="initial-message">
    <Typography variant='caption'>{new Date(currentFriend.createdAt).toUTCString()}</Typography>
    <Typography> <PersonAddIcon/> You're now chatting with {currentFriend.username}</Typography>
    </section>
    {/* display chat bubbles */}
    {
      chatMessages.filter(message=>message.userId === currentFriend.id ||( message.userId === user.id && message.to === currentFriend.id)).map(message=><ChatBubble sentBy={{id:message.userId}} text={message.content}/>)
    }
    </section>
    {/* input for messages */}
    <section className="chat-send-message">
      <TextField variant='outlined'  placeholder="Enter your message" fullWidth InputProps={{endAdornment:<SendIcon onClick={()=>{sendDirectMessage();}} />,color:"secondary"}}
      onChange={(e)=>setNewChatMessage(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){sendDirectMessage();}}} value={newChatMessage}
      // maybe make focused color gradient
      />
    </section>
    </section>

    </div>

  )
}

export default Chat;


function ChatBubble({sentBy,text,timestamp}){
  const {user} = useSelector(state=>state.auth);
  const avatarSize ={width:30,height:30};

  return(
    <div className="chat-message" style={{justifyContent:user.id === sentBy.id ? "flex-end" : "flex-start"}}>
    {
      user.id === sentBy.id ? null : <Avatar sx={avatarSize}/>
    }
    <div className={`chat-message-bubble ${user.id === sentBy.id ? "blue-bubble" : "gray-bubble"}`}>
    <section className="chat-text">
    <Typography>{text ? text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae pulvinar enim, vel tristique ipsum. Ut vitae quam nibh. Integer rutrum nunc eget sodales lacinia. Nullam sit amet interdum lacus. Quisque quis eros ut nulla commodo commodo eu congue turpis. Nam lacinia sit amet risus at consectetur."}</Typography>
    </section>
    <section className="chat-timestamp">
    <Typography variant="caption">{timestamp ? timestamp : new Date("2022-10-18").toUTCString().substring(0,17)}</Typography>
    </section>    
    </div>
    {
      user.id === sentBy.id ? <Avatar sx={avatarSize}/> : null
    }
    </div>
  )
}