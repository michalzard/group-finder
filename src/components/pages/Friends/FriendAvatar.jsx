import { Avatar, Typography } from '@mui/material'
import React from 'react'
import "./FriendAvatar.scss";

function FriendAvatar({}) {
  return (
    <div className="friends-dm ">
    <section>
    <Avatar sx={{width:30,height:30}} className="dm-avatar"/> 
    {/* Somehow display on top of avatar status circle */}
    </section>
    
    <section className="dm-user">
    <Typography variant="subtitle2" component="span">Username</Typography>
    <Typography variant="caption" color="lightgray">Very long biographyVery long biographyVery long biography</Typography>
    </section>
    </div>
  )
}

export default FriendAvatar;