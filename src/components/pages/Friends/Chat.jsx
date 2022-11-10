import { Avatar, TextField, Typography , Menu , MenuItem, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setFriendById } from '../../../redux/slices/friendsSlice';
import "./Chat.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ChatThemeColors from "./default-chat-config.json";
import {v4} from "uuid";
import { addChatMessage, selectChatBubbleColor } from '../../../redux/slices/chatSlice';
import { RemoveFriend } from '../../../redux/reducers/friendsReducers';
import { LoadStoredChatMessages } from '../../../redux/reducers/chatReducers';


function Chat({socket,setFriendListOpen}) {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {list,currentFriend} = useSelector(state=>state.friends);
  const {user} = useSelector(state=>state.auth);
  useEffect(()=>{
    //if user loaded /friends/dm/id directly
    if(list.length > 0 && id)dispatch(setFriendById({id}));  
    else navigate("/friends");
  },[list,dispatch,id,navigate]);

  useEffect(()=>{
    if(!socket) return;
    //userId,message itself,to <- id for comparison
    socket.on("DM_RECEIVED",data=>{console.log("DM_RECEIVED",data);dispatch(addChatMessage(data))});

  },[socket,dispatch]);
  
  //from chatbox
  const [newChatMessage,setNewChatMessage] = useState("");
  //messages and their state
  const {chatMessages} = useSelector(state=>state.chat);

  const sendDirectMessage=()=>{
    if(newChatMessage.length > 0 && newChatMessage.length <= 200){
      socket.emit("DM_SEND",{msg_id:v4(),content:newChatMessage,to:currentFriend.id,timestamp:Date.now()});
      dispatch(addChatMessage({msg_id:v4(),content:newChatMessage,to:currentFriend.id,timestamp:Date.now()}));
      setNewChatMessage("");
    }
  }
  
  //menu logic
  const [moreMenuAnchor,setMoreMenuAnchor] = useState(null);
  const [colorMenuAnchor,setColorMenuAnchor] = useState(null);

  // scroll down on new message
  const chatBottom = useRef();
  useEffect(()=>{
    if(chatBottom.current)chatBottom.current.scrollIntoView({behaviour:"smooth"});
  },[chatMessages]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const {presence} = useSelector(state=>state.friends);
  const isOnline=(id)=>{
  if(presence.includes(id)) return true;
  else return false;
  }
  
  useEffect(()=>{
    console.log(id);
    dispatch(LoadStoredChatMessages({recipientId:id}));
  },[]);


  return (
    <div className="private-chat">
    {/* Lighter top bar with avatar + name ,status on right */}
    <section className="chat-header">
    <section className="user-info"> 
    {/* onclick open sidebar with friendlist */}
    <MenuIcon className='friendListOpen' onClick={()=>{setFriendListOpen(true);}}/>
    <Avatar/> 
    <Typography variant={`${isMobile ? "subtitle1" : "h5"}`}>{currentFriend.username}</Typography>
    {/* show online/offline circle */}
    <div className="userStatus" style={{backgroundColor:isOnline(id) ? "greenyellow" : "gray",margin:"0 5px"}}/>

    </section>
    {/* onclick open menu */}
    <MoreVertIcon className="chat-open-more" onClick={(e)=>setMoreMenuAnchor(e.currentTarget)}/>
    </section>

    <section className="chat-messages-container">
    
    <section className="chat-messages">

    <section className="initial-message">
    <Typography variant='caption'>{new Date(currentFriend.createdAt).toUTCString()}</Typography>
    <Typography> <PersonAddIcon/> You're now chatting with {currentFriend.username}</Typography>
    </section>
    {/* display chat bubbles */}
    {
      chatMessages.filter(message=>message.to === currentFriend.id || message.sender === currentFriend.id).map(message=>
      <ChatBubble key={message.msg_id} timestamp={message.timestamp} sentBy={{id:message.sender || user.id}} text={message.content}/>)
    }
    {/* use this element to be scroll down into to have messages in view */}
    <span ref={chatBottom}/>
    </section>
    {/* input for messages */}
    <section className="chat-send-message">
    <SettingsIcon onClick={(e)=>setColorMenuAnchor(e.currentTarget)}/>
      <TextField variant='outlined' inputProps={{maxLength:200}}  placeholder="Enter your message" fullWidth InputProps={{endAdornment:<SendIcon onClick={()=>{sendDirectMessage();}} />,color:"secondary"}}
      onChange={(e)=>setNewChatMessage(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){sendDirectMessage();}}} value={newChatMessage}
      // maybe make focused color gradient
      />
    </section>
    </section>

    <MoreMenu anchor={moreMenuAnchor} handleClose={()=>{setMoreMenuAnchor(null)}}/>
    <ColorMenu anchor={colorMenuAnchor} handleClose={()=>{setColorMenuAnchor(null)}}/>
    </div>

  )
}

export default Chat;


function ChatBubble({sentBy,text,timestamp}){
  const {user} = useSelector(state=>state.auth);
  const avatarSize ={width:30,height:30};
  const {chatBubbleColor} = useSelector(state=>state.chat)

  return(
    <div className="chat-message" style={{justifyContent:user.id === sentBy.id ? "flex-end" : "flex-start"}}>
    {
      user.id === sentBy.id ? null : <Avatar sx={avatarSize}/>
    }

    <div className={`chat-message-bubble ${user.id === sentBy.id ? null : "gray-bubble"}`} style={{backgroundColor:chatBubbleColor}}>
    <section className="chat-text">
    <Typography>{text ? text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae pulvinar enim, vel tristique ipsum. Ut vitae quam nibh. Integer rutrum nunc eget sodales lacinia. Nullam sit amet interdum lacus. Quisque quis eros ut nulla commodo commodo eu congue turpis. Nam lacinia sit amet risus at consectetur."}</Typography>
    </section>
    <section className="chat-timestamp">
    <Typography variant="caption">{timestamp ? new Date(timestamp).toUTCString().substring(0,17) : new Date("2022-10-18").toUTCString().substring(0,17)}</Typography>
    </section>    
    </div>
    {
      user.id === sentBy.id ? <Avatar sx={avatarSize}/> : null
    }
    </div>
  )
}

//TODO:handle functions mentioned in menu items
function MoreMenu({anchor,handleClose}){
  const dispatch = useDispatch();
  const {currentFriend} = useSelector(state=>state.friends);
  const removeFriend=()=>{dispatch(RemoveFriend({friendId:currentFriend.id}));}
  // const reportFriend=()=>{console.log("TODO : report friend");}
  // const shareProfile=()=>{console.log("TODO : grab link for friend's profile");}

  return(
    <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={handleClose} >
    {/* it gets redirected */}
    <MenuItem onClick={()=>{removeFriend(); handleClose();}}> Remove Friend </MenuItem>
    <MenuItem > Report </MenuItem>
    <MenuItem> Share profile link </MenuItem>

    </Menu>
  )
}



function ColorMenu({anchor,handleClose}){
  const colors = Object.entries(ChatThemeColors).map(a=>{return {name:a[0],value:a[1]}});
  const dispatch = useDispatch();
  const {chatBubbleColor}  = useSelector(state=>state.chat)
  return(
    <Menu open={Boolean(anchor)} id="color-menu" anchorEl={anchor} onClose={handleClose} anchorOrigin={{vertical:"top",horizontal:"left"}} >
    <Typography>Choose chat bubble color</Typography>
    <div className='color-picker'>
    {
      colors.map((color,i)=>(<div key={i} className={`dot ${chatBubbleColor === color.value ? "dot-selected" : null}`} onClick={()=>{dispatch(selectChatBubbleColor(color.value))}} style={{backgroundColor:color.value}}/>))  
    }
    </div>
    </Menu>

  )
}