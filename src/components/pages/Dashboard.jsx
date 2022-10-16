import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import "./Dashboard.scss";
import {ReactComponent as DiscordLogo} from "../../assets/discord-icon.svg";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BuildIcon from '@mui/icons-material/Build';


function Dashboard() {
  const {user} = useSelector((state)=>state.auth);
  return (
    <>
          <Header />
          <main className="dashboard">
          
          <Typography variant="h4">Welcome Back , {user.username}.</Typography>
          <Typography variant="subtitle1" color="lightgray" gutterBottom>Let's find you a group.</Typography>
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
          <Typography variant="h6">Latest News</Typography>
          <section className="dashboard-sidebar-window">
          <div className="info">
          <Typography variant="h5">New Feature</Typography>
          <Typography>Description of said feature</Typography>
          </div>
          <AutoFixHighIcon/>
          </section>
          
          <section className="dashboard-sidebar-window">
          <div className="info">
          <Typography variant="h5">New Hotfix</Typography>
          <Typography>Description of said hotfix</Typography>
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
