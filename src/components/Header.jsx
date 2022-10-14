import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import { Avatar, Typography,Menu,MenuItem } from '@mui/material';
import GroupsLogo from "../assets/groups-logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import "./Header.scss";
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/reducers/userReducers';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';


function Header() {
  const [menuAnchor,setMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  return (
    <header>
    <section className='nav'>
    <Link to="/dashboard"><HomeIcon/></Link>
    <Link to="/discover"><SearchIcon/> <Typography>Discover</Typography></Link>
    <Link to="/friends/all"><GroupIcon/> <Typography>Friends</Typography></Link>
    </section>
    <section className="logo">
    <img src={GroupsLogo} alt="Groups Logo"/>
    </section>
    <section className="menu">
    <Avatar/>
    <MenuIcon onClick={(e)=>{setMenuAnchor(e.currentTarget)}}/>
    </section>
    <Menu
    anchorEl={menuAnchor}
    open={Boolean(menuAnchor)}
    onClose={()=>{setMenuAnchor(null);}}
    >
      <MenuItem><PersonIcon/>My Profile</MenuItem>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem onClick={()=>{dispatch(userLogout());}}><ExitToAppIcon/>Logout</MenuItem>
    </Menu>
    </header>
  )
}

export default Header;
