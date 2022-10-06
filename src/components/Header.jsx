import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import GroupsLogo from "../assets/groups-icon.png";
import MenuIcon from '@mui/icons-material/Menu';
import "./Header.scss";

function Header() {
  return (
    <header>
    <section className='nav'>
    <Link to="/dashboard"><HomeIcon/></Link>
    <Link to="/discover"><SearchIcon/> <Typography>Discover</Typography></Link>
    <Link to="/friends"><GroupIcon/> <Typography>Friends</Typography></Link>
    </section>
    <section className="logo">
    <img src={GroupsLogo} alt="Groups Logo"/>
    </section>
    <section className="menu">
    <Avatar/>
    <MenuIcon/>
    </section>

    </header>
  )
}

export default Header;
