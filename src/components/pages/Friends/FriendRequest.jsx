import { Avatar, Typography } from "@mui/material";
import React from "react";
import "./FriendRequest.scss";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function FriendRequest({type,request}) {
  
  const acceptRequest = ()=>{
    console.log("Friend Request Accepted");
  }

  const declineRequest = () =>{
    console.log("Friend Request Declined");
  }

  if(!request) return;
  return (
    <div className="friend-request">
      <section>
        <Avatar sx={{ width: 30, height: 30, marginRight: "10px" }} />
        {/* Somehow display on top of avatar status circle */}
      </section>

      <section className="friend-user">
        <Typography variant="subtitle2" component="span"> {type === "pending" ? request.requester.username : request.recipient.username}</Typography>
        <Typography variant="caption" color="lightgray"> {type === "pending" ? "Pending Friend Request" : "Ongoing Friend Request"}</Typography>
      </section>
      {request ? <section className="friend-actions"> 
      {
        type === "pending" ? <> <CheckIcon sx={{color:"greenyellow"}} onClick={acceptRequest} /> <ClearIcon className="redX" onClick={declineRequest}/> </> 
        : <ClearIcon className="redX" onClick={declineRequest}/> 
      }
      
      </section> : null}
    </div>
  );
}

export default FriendRequest;
