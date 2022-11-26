import { Menu, MenuItem } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
//icons
import LoupeIcon from '@mui/icons-material/Loupe';


function GameProfileMenu({anchor,setAnchor}) {
  const navigate = useNavigate();

  return (
    <Menu
    anchorEl={anchor}
    open={Boolean(anchor)}
    onClose={()=>setAnchor(null)}
    >

    <MenuItem onClick={()=>{setAnchor(null);navigate("/profile/new")}}> <LoupeIcon/> Add new profile</MenuItem>

    {/* List of existing user profiles */}
    {/* Icon , game name , "public" */}
    
    </Menu>
  )
}

export default GameProfileMenu;