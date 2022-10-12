import React from 'react'
import Header from '../../Header';
import "../Friends/Friends.scss";
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';
import FriendAvatar from "./FriendAvatar";
import ForumIcon from '@mui/icons-material/Forum';
import FriendStatus from './FriendStatus';


function Friends() {
  
  const fakeFriendList = Array(200).fill("fake");
  const svgsize = {width:22,height:20};
  return (
    <>
    <Header/>
    <main className="friends">
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
    
    {/* friends status and chat will be displayed here */}
    <section className="dm-content">
    <FriendStatus/>
    </section>
      {/* Possibly will place game profile here for people to copy discord stuff or  */}
    </main>
    </>
  )
}

export default Friends