import React from "react";
import "../pages/LandingPage.scss";
import { Button, ButtonGroup, Typography } from "@mui/material";
import GroupsLogo from "../../assets/groups-logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimelineIcon from "@mui/icons-material/Timeline";
import LanguageIcon from "@mui/icons-material/Language";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatExample from "../../assets/chat-example.png";
import ShareIcon from "@mui/icons-material/Share";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Footer from "../Footer";
//links
import DiscordLogo from "../../assets/discord-icon.svg";
import TwitterIcon from "../../assets/twitter-icon.png";
import FacebookIcon from "../../assets/fb-icon.png";
import InstagramIcon from "../../assets/instagram-icon.png";

import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";


function LandingPage() {
  return (
    <main className="landing-page">
      <HeroSection />
      <ExperienceSection />
      <ChatSection />
      <ShareProfileSection />
      <ProsAndConsSection />
      <SocialLinks />
      <ConnectSection />
      <Footer />
    </main>
  );
}

export default LandingPage;

function HeroSection() {
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <section className="hero">
      <img src={GroupsLogo} alt="App logo" />
      <Typography variant={`${isMobile ? "h6" : "h5"}`} color="white" gutterBottom>
        Find your dream team!
      </Typography>
      <Typography variant={`${isMobile ? "body2" : "h6"}`} color="lightgray" gutterBottom>
        Search for people to play with,match with your dream teammates,
        <br />
        meet new players and never play alone again!
      </Typography>
      <Typography variant={`${isMobile ? "subtitle2" : "subtitle1"}`} color="lightgray" gutterBottom>
        <u>Made by gamer for gamers</u>™
      </Typography>

      {
        isMobile ?
        <div className="btns-mobile">
        <Button variant="outlined" onClick={()=>{navigate("/register")}} startIcon={<EditIcon />}>
          Register
        </Button>
        <Button variant="outlined" endIcon={<ArrowDropDownIcon />}>
          What is{" "}
          <img
            src={GroupsLogo}
            alt="App logo inside button"
            className="btnImg"
          />{" "}
          all about?{" "}
        </Button>
        </div>
        :  <ButtonGroup className="btns">
        <Button variant="outlined" onClick={()=>{navigate("/register")}} startIcon={<EditIcon />}>
          Register
        </Button>
        <Button variant="outlined" endIcon={<ArrowDropDownIcon />}>
          What is{" "}
          <img
            src={GroupsLogo}
            alt="App logo inside button"
            className="btnImg"
          />{" "}
          all about?{" "}
        </Button>
      </ButtonGroup>
      }
    

      <section className="alreadyMember">
        <Typography variant="subtitle1" color="lightgray">
          Already a member?{" "}
        </Typography>
        <Button variant="outlined" onClick={()=>{navigate("/login")}}>Login</Button>
      </section>
    </section>
  );
}

function ConnectSection() {
  const navigate= useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const desc = `${isMobile ?"subtitle2" : "subtitle1"}`;
  return (
    <div className="connect">
      <article>
        <section className="signup">
          <Typography variant="h3" gutterBottom>
            <EditIcon /> Sign up
          </Typography>
          <Typography variant={desc}>
            Tell us about you and what you are looking for.
          </Typography>
        </section>

        <section className="lookaround">
          <Typography variant="h3" gutterBottom>
            <SearchIcon />
            Look Around
          </Typography>
          <Typography variant={desc}>
            Personalised list of players with shared common interest.
          </Typography>
        </section>

        <section className="connect-players">
          <Typography variant="h3" gutterBottom>
            <PersonAddIcon />
            Connect
          </Typography>
          <Typography variant={desc}>
            Add one and other,
            get to know each other and never play solo again.
          </Typography>
        </section>
      </article>
      <Button variant="outlined" onClick={()=>{navigate("/login")}} startIcon={<EditIcon />} size="large">
      Login
      </Button>
    </div>
  );
}

function ExperienceSection() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="experience">
      <Typography variant={`${isMobile ? "h4" : "h3"}`} gutterBottom>The ultimate group finder experience</Typography>
      <Typography variant={`${isMobile ? "subtitle1" : "h6"}`} color="lightgray">
        Find like-minded groups of players based on your common interest.
      </Typography>
      <article className="exp-grid">
        <section>
          <Typography variant="h4">Skill</Typography>
          <TrendingUpIcon />
        </section>
        <section>
          <Typography variant="h4">Ambition</Typography>
          <TimelineIcon />
        </section>
        <section>
          <Typography variant="h4">Language & Location</Typography>
          <LanguageIcon />
        </section>
      </article>
    </div>
  );
}

function ChatSection() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="chat-w-friends">
      <section className="info">
        <Typography variant={`${isMobile ? "h5" :"h3"}`} gutterBottom>Chat with your new friends!</Typography>
        <Typography variant={`${isMobile ? "body1" : "subtitle1"}`} color="lightgray" gutterBottom>
          No more waiting for people to accept you via discord,
          <br />
          you can message them immediately trough our chat system and start
          playing.
          <br/>
          if you are looking for duo or someone to fill up that last slot in
          your team, use chat to see who's available.
        </Typography>
      </section>
      <img src={ChatExample} alt="Message players trough our chat system" />
    </div>
  );
}

function ShareProfileSection() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="share-profile">
      <section className="info">
        <Typography variant={`${isMobile ? "h4" : "h3"}`}>
          <ShareIcon />
          Share your profile
        </Typography>
        <Typography variant="subtitle1" color="lightgray">
          Easily share your profile with just one click.
          <br />
          We create custom public link just for you so you can share it with
          anyone trough any media.
        </Typography>
      </section>
    </div>
  );
}

function ProsAndConsSection() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="pros-cons">
      <Typography variant={`${isMobile ? "h4" : "h3"}`} gutterBottom>
        Pros & Cons
      </Typography>
      <article>
        <section className="pros">
          <Pro description={"Best teammates you can find."} />
          <Pro description={"All the information and tools in one place."} />
          <Pro description={"Exchange contact only with suitable players."} />
          <Pro description={"Play with like-minded people."} />
        </section>
        <section className="cons">
          <Typography variant={`${isMobile ? "subtitle2" : "subtitle1"}`} gutterBottom>
            Don't waste your time
          </Typography>
          <Con description={"scrolling trough lists of unavailable players."} />
          <Con
            description={"posting on community discords ,forums and such."}
          />
          <Con
            description={
              "accepting 1000s of friend requests just to find suitable players."
            }
          />
          <Con description={"playing with the wrong people."} />
        </section>
      </article>
    </div>
  );
}

function Pro({ description }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <section className="pro">
      <CheckIcon />
      <Typography variant={`${isMobile ? "caption" : "body1" }`}>{description}</Typography>
    </section>
  );
}

function Con({ description }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <section className="con">
      <ClearIcon />
      <Typography variant={`${isMobile ? "caption" : "body1" }`}>{description}</Typography>
    </section>
  );
}

function SocialLinks() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <section className="links">
      <Typography variant="h3" gutterBottom>
        Let's become friends
      </Typography>
      <Typography variant={`${isMobile ? "subtitle2" : "subtitle1"}`} color="lightgray" gutterBottom>
        You can find us anywhere on these platforms.
      </Typography>
      <div className="link-imgs">
        <a href="https://discord.gg/NsDs5SKedr" target="_blank" rel="noreferrer">
          <img src={DiscordLogo} alt="Discord Logo" />
        </a>
        <a
          href="https://instagram.com/michalzard"
          target="_blank"
          rel="noreferrer"
        >
          <img src={InstagramIcon} alt="Instagram Logo" />
        </a>
        <a
          href="https://facebook.com/michalzard"
          target="_blank"
          rel="noreferrer"
        >
          <img src={FacebookIcon} alt="Facebook Logo" />
        </a>
        <a
          href="https://twitter.com/michalzard"
          target="_blank"
          rel="noreferrer"
        >
          <img src={TwitterIcon} alt="Twitter Logo" />
        </a>
      </div>
    </section>
  );
}


