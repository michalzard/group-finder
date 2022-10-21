import { Typography } from "@mui/material";
import React from "react";
import GroupsLogo from "../assets/groups-logo.png";
import GroupsIcon from "../assets/groups-icon.png";
import {useMediaQuery} from "@mui/material";


export default function Footer() {
  const isMobile = useMediaQuery("(max-width:600px)");
    return (
      <footer>
        <img src={isMobile ? GroupsIcon : GroupsLogo} alt="Groups Logo" />
        <div className="copyright">
          <Typography variant={`${isMobile ? "subtitle1" : "h6"}`} gutterBottom>
            Made with ❤️ by <a href="https://github.com/michalzard">Michalzard</a>
          </Typography>
          <Typography variant={`${isMobile ? "subtitle1" : "h6"}`} gutterBottom>
            © Groups ~ {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </div>
      </footer>
    );
  }