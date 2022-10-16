import { Typography } from '@mui/material';
import React from 'react'

function Chat({socket,friend}) {
  console.log(socket);
  return (
    <div className="Chat">
    <Typography variant='h6' color="white">{socket.id} Chatting with </Typography>
    </div>

  )
}

export default Chat;