import React from 'react'
import Header from '../../Header';
import "../Friends/Friends.scss";
import GroupIcon from '@mui/icons-material/Group';
import { Typography } from '@mui/material';
// import FriendRequest from "./FriendRequest";
import ForumIcon from '@mui/icons-material/Forum';
import FriendStatus from './FriendStatus';
import FriendDms from './FriendDms';
import { useNavigate, useParams } from 'react-router-dom';


function Friends() {
  //Id will be used to determine which dms to open and which person's chat opens
  const {id} = useParams();
  const navigate = useNavigate();

  const fakeFriendList = Array(200).fill("fake");
  const svgsize = {width:22,height:20};

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
      fakeFriendList.map((friend,i)=>{return <FriendDms key={i} username={"Fake Friend"}/>})
    }
    
    </div>
    {/* nav bar on top =>  icon Friends Online All Pending Blocked Add Friend Button  */}
    </section>
    
    {/* friends status and chat will be displayed here */}
    <section className="dm-content">
      {
        id ? <Typography variant="h2" >Chat {id}</Typography>
        : <FriendStatus/>
    
      }
    </section>
      {/* Possibly will place game profile here for people to copy discord stuff or  */}
    </main>
    </>
  )
}

export default Friends