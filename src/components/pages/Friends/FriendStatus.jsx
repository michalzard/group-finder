import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import "./FriendStatus.scss";
import { useDispatch, useSelector } from 'react-redux';
import { PendingFriendsRequests } from '../../../redux/reducers/friendsReducers';
import FriendAvatar from './FriendAvatar';


function FriendStatus() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(PendingFriendsRequests());
  }, [dispatch])
  
  const pendingRequests = useSelector((state)=>state.friends.requests);

  return (
    <div className="friend-status">
    <nav className="friend-nav">
    <Typography className="title" variant="button"><GroupIcon/> Friends</Typography>
    <Button variant="text" color="inherit" >All</Button>
    <Button variant="text" color="inherit" >Online</Button>
    <Button variant="text" color="inherit" className="selected">Pending</Button>
    <Button variant="text" color="inherit">Blocked</Button>
    <Button variant="contained" color="success">Add Friend</Button>
    </nav>
    <section className="friends-by-status">
    <Typography>Pending</Typography>
    {
    }
    </section>
    </div>
  )
}

export default FriendStatus;

export function FriendRequests({requests}){
  console.log(requests);
    return(
        <div className="friend-request">
         </div>
    )
}