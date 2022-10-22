import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import "./Dashboard.scss";
import {ReactComponent as DiscordLogo} from "../../assets/discord-icon.svg";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BuildIcon from '@mui/icons-material/Build';


function Dashboard() {
  const {user} = useSelector((state)=>state.auth);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
          <Header />
          <main className="dashboard">
          
          <Typography variant={`${isMobile ? "subtitle1" : "h4"}`} gutterBottom>Welcome back , {user.username}.</Typography>
          <Typography variant={`${isMobile ? "subtitle2" : "subtitle1"}`} color="lightgray" style={{marginBottom:"20px"}} gutterBottom>Let's find you a group.</Typography>
          <article className="dashboard-content">
          {/* Left Side */}
          <section className="dashboard-sidebar">
          <a href="https://discord.gg/NsDs5SKedr" target="_blank" rel="noreferrer">
          <section className="dashboard-sidebar-window discord-invite">
          <div className="info">
          <Typography variant="h5" gutterBottom>Join our Discord</Typography>
          <Typography variant="body1">Join us, chat with discord community and share feedback with us to improve.</Typography>
          </div>
          <DiscordLogo/>
          </section>
          </a>

          <div className="latest">
          <Typography  variant={`${isMobile ? "subtitle1" : "h6"}`}>Latest News</Typography>
          <section className="dashboard-sidebar-window">
          <div className="info">
          <Typography variant="h5">New Feature</Typography>
          <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a neque ut massa vehicula aliquam non ac quam.</Typography>
          </div>
          <AutoFixHighIcon/>
          </section>
          
          <section className="dashboard-sidebar-window">
          <div className="info">
          <Typography variant="h5">New Hotfix</Typography>
          <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a neque ut massa vehicula aliquam non ac quam.</Typography>
          </div>
          <BuildIcon/>
          </section>

          </div>
          </section>
          {/* Right side */}
          <section className="dashboard-new">
          <Typography variant="h6">Friends List</Typography>
          <Typography>List of friends filtered by their activity✨</Typography>
          <Typography>Online/Offline</Typography>
     
          </section>
          
          </article>
          </main>
    </>
  );
}

export default Dashboard;
