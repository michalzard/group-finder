import { Typography } from "@mui/material";
import React from "react";
import GroupsLogo from "../assets/groups-logo.png";

export default function Footer() {
    return (
      <footer>
        <img src={GroupsLogo} alt="Groups Logo" />
        <div className="copyright">
          <Typography variant="h6" gutterBottom>
            Made with ❤️ by <a href="https://github.com/michalzard">Michalzard</a>
          </Typography>
          <Typography variant="h6" gutterBottom>
            © Groups ~ {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </div>
      </footer>
    );
  }