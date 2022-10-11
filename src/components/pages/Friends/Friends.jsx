import React, { useEffect } from 'react'
import Header from '../../Header';
import "../Friends/Friends.scss";
import GroupIcon from '@mui/icons-material/Group';
import { Button, Typography } from '@mui/material';
import FriendAvatar from "./FriendAvatar";
import ForumIcon from '@mui/icons-material/Forum';



function Friends() {
  useEffect(()=>{
    //load requests
  },[])
  const fakeFriendList = Array(200).fill("fake");
  const svgsize = {width:20,height:20};
  return (
    <>
    <Header/>
    <div className="friends">
    <section className="dms">
    {/* Icon, name, status(online/offline) */}
    <div className="dm-top">
    <Typography variant="subtitle1" gutterBottom> <GroupIcon sx={svgsize}/>Friends</Typography>
    <Typography variant="subtitle2" gutterBottom> <ForumIcon sx={svgsize}/>Direct Messages</Typography>
    </div>

    <div className="dm-friend-avatars">
    {
      fakeFriendList.map((friend,i)=><FriendAvatar key={i}/>)
    }
    </div>
    {/* nav bar on top =>  icon Friends Online All Pending Blocked Add Friend Button  */}
    </section>
    
    <section className="chat">

    </section>
    <section className="gprofile">
      {/* Possibly will place game profile here for people to copy discord stuff or  */}
    </section>
    </div>
    </>
  )
}

export default Friends