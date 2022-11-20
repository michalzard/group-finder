import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import { Link, useNavigate } from 'react-router-dom';
import { Typography,Menu,MenuItem, useMediaQuery } from '@mui/material';
import GroupsLogo from "../assets/groups-logo.png";
import "./Header.scss";
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/reducers/userReducers';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function Header() {
  const [menuAnchor,setMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  return (
    <header>
    <section className='nav'>
    <Link to="/dashboard"><HomeIcon/></Link>
    <Link to="/discover"><SearchIcon/> {isMobile ? "" : <Typography>Discover</Typography>}</Link>
    <Link to="/friends/all"><GroupIcon/> {isMobile ? "" : <Typography>Friends</Typography>}</Link>
    </section>
    {isMobile ? null : <section className="logo"><img src={GroupsLogo} alt="Groups Logo"/></section>}

    <section className="menu">
    <AddCircleOutlineIcon className='plus' onClick={()=>navigate("/profilecreation")}/>
    <DensityMediumIcon onClick={(e)=>{setMenuAnchor(e.currentTarget)}}/>
    </section>
    <Menu
    anchorEl={menuAnchor}
    open={Boolean(menuAnchor)}
    onClose={()=>{setMenuAnchor(null);}}
    disableScrollLock={true}
    id="userProfileMenu"
    >
      <MenuItem onClick={()=>navigate("/profile")}><PersonIcon/>Edit my profile</MenuItem>
      {/* Popup dialog window with form to submit feedback */}
      <MenuItem><FeedbackIcon/>Submit a feedback</MenuItem>
      <MenuItem onClick={()=>navigate("help")}><HelpIcon/> Help / Faq</MenuItem>
      <MenuItem onClick={()=>{dispatch(userLogout());}}><ExitToAppIcon/>Logout</MenuItem>
    </Menu>
    </header>
  )
}

export default Header;
