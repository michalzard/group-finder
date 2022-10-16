import React, { useEffect, useState } from 'react'
import Header from '../../Header';
import "../Friends/Friends.scss";
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';
// import FriendRequest from "./FriendRequest";
import ForumIcon from '@mui/icons-material/Forum';
import FriendStatus from './FriendStatus';
import FriendDms from './FriendDms';
import { useNavigate, useParams } from 'react-router-dom';
import {io} from "socket.io-client";
import { useSelector } from 'react-redux';
import Chat from './Chat';

function Friends() {
  //Id will be used to determine which dms to open and which person's chat opens
  const {id} = useParams();
  const navigate = useNavigate();
  const [socket,setSocket] = useState(null);

  const svgsize = {width:22,height:20};

  const friendList = useSelector(state=>state.friends.list);

  useEffect(()=>{
    const newSocket = io(`${process.env.REACT_APP_GATEWAY_URL}`);
    setSocket(newSocket);
    newSocket.on("connection",(data)=>{console.log(data)});
    return ()=> newSocket.disconnect();
  },[]);

  return (
    <>
    <Header/>
    <main className="friends">
    <section className="dms">
    {/* Icon, name, status(online/offline) */}
    <div className="dm-top">
    <Typography variant="subtitle1" className={id ? null : "selected"} gutterBottom onClick={()=>{navigate("/friends/all")}}> <GroupIcon sx={svgsize}/>Friends</Typography>
    <Typography variant="subtitle2" gutterBottom> <ForumIcon sx={svgsize}/>Direct Messages</Typography>
    </div>

    <div className="dm-friend-avatars">
 
    {
      friendList.map((friend,i)=>{return <FriendDms key={i} username={friend.username}/>})
    }
    
    </div>
    {/* nav bar on top =>  icon Friends Online All Pending Blocked Add Friend Button  */}
    </section>
    
    {/* friends status and chat will be displayed here */}
    <section className="dm-content">
      {
        id ? <Chat socket={socket} /> : <FriendStatus/>
      }
    </section>
      {/* Possibly will place game profile here for people to copy discord stuff or  */}
    </main>
    </>
  )
}

export default Friends