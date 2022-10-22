import React, { useEffect, useState } from 'react'
import Header from '../../Header';
import "../Friends/Friends.scss";
import GroupIcon from '@mui/icons-material/Group';
import { Typography, useMediaQuery } from '@mui/material';
// import FriendRequest from "./FriendRequest";
import ForumIcon from '@mui/icons-material/Forum';
import FriendStatus from './FriendStatus';
import FriendDms from './FriendDms';
import { useNavigate, useParams } from 'react-router-dom';
import {io} from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import { LoadAllFriends, PendingFriendsRequests } from '../../../redux/reducers/friendsReducers';
import { addFriendRequest, replaceFriendList } from '../../../redux/slices/friendsSlice';

function Friends() {
  //Id will be used to determine which dms to open and which person's chat opens
  const {id} = useParams();

  const dispatch = useDispatch();
  
  const [socket,setSocket] = useState(null);
  const {success} = useSelector(state=>state.friends);
  const user = useSelector(state=>state.auth.user);
  useEffect(() => {
    //no success message => load whole friend state
    if(success===""){
    dispatch(LoadAllFriends());
    dispatch(PendingFriendsRequests());
    }

  }, [dispatch,success]);

  useEffect(()=>{
    const socket = io(`${process.env.REACT_APP_GATEWAY_URL}`,{auth:user});
    setSocket(socket);
    // socket.on("FR_CHANGE",(data)=>console.log(data));

    //on new friend request
    socket.on("FR_NEW",(data)=>{
      dispatch(addFriendRequest({data,user}));
    });

    socket.on("FRIENDLIST_UPDATE",(data)=>{
      const {updatedFriendList} = data;
      dispatch(replaceFriendList(updatedFriendList));
    })

    return ()=> socket.disconnect();
  },[user,dispatch]);

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
    <Header/>
    <main className="friends">
   {
    isMobile ? null : <FriendListSidebar/>
   }
   
    
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

export default Friends;


export function FriendListSidebar({friendButton}){
  const {id} = useParams();
  const navigate = useNavigate();
  const friendList = useSelector(state=>state.friends.list);
  const svgsize = {width:22,height:20};
  return(
    <section className="dms">
    {/* Icon, name, status(online/offline) */}
    <div className="dm-top">
    {
      friendButton ? <Typography variant="subtitle1" className={id ? null : "selected"} gutterBottom onClick={()=>{navigate("/friends/all")}}> <GroupIcon sx={svgsize}/>Friends</Typography>
      : null
    }
    <Typography variant="subtitle2" gutterBottom> <ForumIcon sx={svgsize}/>Direct Messages</Typography>
    </div>

    <div className="dm-friend-avatars">
 
    {
      friendList.map((friend)=>{return <FriendDms key={friend.id} friend={friend}/>})
    }
    
    </div>
    {/* nav bar on top =>  icon Friends Online All Pending Blocked Add Friend Button  */}
    </section>
)
}