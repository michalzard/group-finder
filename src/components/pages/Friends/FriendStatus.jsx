import React, { useEffect } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./FriendStatus.scss";
import { useDispatch, useSelector } from "react-redux";
import { PendingFriendsRequests } from "../../../redux/reducers/friendsReducers";
import FriendRequest from "./FriendRequest";
import { useNavigate, useParams } from "react-router-dom";

function FriendStatus() {
  const {display} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(PendingFriendsRequests());
  }, [dispatch]);


  const renderStatus = (display)=>{
    switch(display){
      case "all" : return <AllFriends/>
       case "online" : return <OnlineFriends/>
       case "pending" : return  <AllPendingRequests/>
       case "blocked" : return <BlockedFriends/>
       default : return <AllFriends/>
    }
  }
  const isSelected = (buttonName)=>{
    return display === buttonName ? "selected" : null;
  }

  return (
    <div className="friend-status">
      <nav className="friend-nav">
        <Typography className="title" variant="button"><GroupIcon /> Friends</Typography>
        <Button variant="text" color="inherit" className={isSelected("all")} onClick={()=>{navigate("/friends/all")}}>All</Button>
        <Button variant="text" color="inherit" className={isSelected("online")} onClick={()=>{navigate("/friends/online")}}>Online</Button>
        <Button variant="text" color="inherit" className={isSelected("pending")} onClick={()=>{navigate("/friends/pending")}}>Pending</Button>
        <Button variant="text" color="inherit" className={isSelected("blocked")} onClick={()=>{navigate("/friends/blocked")}}>Blocked</Button>
        <Button variant="contained" color="success">Add Friend</Button>
      </nav>
      <section className="friends-by-status">
       {
        renderStatus(display)
       }
      </section>
    </div>
  );
}

export default FriendStatus;

function AllFriends(){
  return(
    <Typography>All Friends</Typography>
  )
}

function AllPendingRequests(){
  const friendRequests = useSelector((state) => state.friends.requests);
  const pendingRequests = friendRequests.find(freq=>{return freq.type==="pending"});
  const outgoingRequests = friendRequests.find(freq=>{return freq.type==="outgoing"});
  return(
      <>
      {/* All pending requests combined */}
      <Typography variant="subtitle2" gutterBottom color="lightgray">
      Pending - {pendingRequests && outgoingRequests ? pendingRequests.requests.length + outgoingRequests.requests.length : 0}</Typography>
      <hr/>
      <section className="requests">
      { outgoingRequests ? outgoingRequests.requests.map(req=>{return <FriendRequest key={req._id} type={outgoingRequests.type} request={req}/>}) : <CircularProgress/>}
      { pendingRequests ? pendingRequests.requests.map(req=>{return <FriendRequest key={req._id} type={pendingRequests.type} request={req}/>}) : <CircularProgress/>}

      </section>
      </>
  )
}

function OnlineFriends(){
  return(
    <Typography>Online Friends</Typography>

  )
}

function BlockedFriends(){
  return(
    <Typography>Blocked Friends</Typography>
  )
}
