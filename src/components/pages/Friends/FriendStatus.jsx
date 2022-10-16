import React, { useEffect, useState } from "react";
import { Alert, Button, CircularProgress, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./FriendStatus.scss";
import { useDispatch, useSelector } from "react-redux";
import { AddFriend } from "../../../redux/reducers/friendsReducers";
import FriendRequest from "./FriendRequest";
import { useNavigate, useParams } from "react-router-dom";
import FriendDms from "./FriendDms";
import { useFormik } from "formik";
import * as yup from "yup";


function FriendStatus() {
  const {display} = useParams();
  const navigate = useNavigate();

  const renderStatus = (display)=>{
    switch(display){
      case "all" : return <AllFriends/>
       case "online" : return <OnlineFriends/>
       case "pending" : return  <AllPendingRequests/>
       case "blocked" : return <BlockedFriends/>
       case "add" : return <AddFriendField/>
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
        <Button variant="contained" color="success" onClick={()=>{navigate("/friends/add")}}>Add Friend</Button>
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
  const {list,loading} = useSelector(state=>state.friends);
  return(
    <>
    {
    loading ? <LinearProgress/> :
    <>
    <Typography variant="subtitle2" color="lightgray">All Friends - {list.length}</Typography>
    <hr/>
    {
      list.map(friend=>{return <FriendDms key={friend.id} id={friend.id} username={friend.username} bio={friend.bio}/>})
    }
    </>
    }
    
    </>
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
  const {list,loading} = useSelector(state=>state.friends);
  //filter out list to only display online status after its added
  return(
    <>
    {
    loading ? <LinearProgress/> :
    <>
    <Typography variant="subtitle2" color="lightgray">Online Friends - {list.length}</Typography>
    <hr/>
    {
      list.map(friend=>{return <FriendDms key={friend.id} username={friend.username} bio={friend.bio}/>})
    }
    </>
    }
    
    </>

  )
}

function BlockedFriends(){
  return(
    <>
    <Typography>Blocked Friends</Typography>
    WIP
    </>
    )
}

function AddFriendField(){
  const wField = {style:{color:"white"}};
  const dispatch = useDispatch();
  const addFriendValidation = yup.object().shape({
  friendName:yup.string()
  .required("Please enter friend's username")
  .min(2,"Usernames are atleast 2 characters long")
  .max(20,"Usernames cannot be longer than 20 characters long")
  .trim(),
  });
  const {values,errors,handleBlur,handleChange,isSubmitting,handleSubmit} = useFormik({
    initialValues:{
      friendName:"",
    },
    validationSchema:addFriendValidation,
    onSubmit:(values,actions)=>{
      dispatch(AddFriend({username:values.friendName}));
      actions.resetForm();
    }
  })

  const {success,error} = useSelector(state=>state.friends);
  const [errorOpen,setErrorOpen] = useState(false);
  const [successOpen,setSuccessOpen] = useState(false);
  useEffect(()=>{
    //update state for error/success since i have to use state to manually change to false
    // for snackbar to call onClose after autoHideDuration
    setErrorOpen(Boolean(error));
    setSuccessOpen(Boolean(success));
  },[error,success]);

  return(
    <form onSubmit={handleSubmit} className="send-friend-request">
    <TextField value={values.friendName} name="friendName" onChange={handleChange} onBlur={handleBlur} inputProps={wField} fullWidth
    error={Boolean(errors.friendName)} helperText={errors.friendName ? errors.friendName : ""} placeholder="Enter friend's username"
    InputProps={{endAdornment:<Button type="submit" variant="contained" disabled={isSubmitting}>Send Friend Request</Button>}}
    />
      <Snackbar
        open={errorOpen}
        onClose={()=>{setErrorOpen(false)}}
        autoHideDuration={5000}//closes automatically after 5 seconds
        anchorOrigin={{vertical:"bottom",horizontal:"right"}}
      >
      <Alert severity="error" variant="filled">{error}</Alert>
      </Snackbar>

      <Snackbar
        open={successOpen}
        onClose={()=>{setSuccessOpen(false)}}
        autoHideDuration={5000}//closes automatically after 5 seconds
        anchorOrigin={{vertical:"bottom",horizontal:"right"}}
      >
      <Alert severity="success" variant="filled">{success}</Alert>
      </Snackbar>


    </form>
  )
}