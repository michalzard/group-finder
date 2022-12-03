import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const DISCORD_CDN = "https://cdn.discordapp.com";

function SeventhStep() {
  //load all info from redux state
  const { id, avatar, username } = useSelector(
    (state) => state.auth.user.discord
  );
  return (
    <section className="game-profile-summary">
      <div className="summary-labels">
        <Typography>Nickname</Typography>
        <Typography>Roles</Typography>
        <Typography>Rank</Typography>
        <Typography>Age</Typography>
        <Typography>Profile</Typography>
        <Typography>Discord</Typography>
      </div>
      <div className="summary-values">
        <Typography>Values</Typography>
        <Typography>Values</Typography>
        <Typography>Values</Typography>
        <Typography>Values</Typography>
        <Typography>Values</Typography>

        <div className="discord-value">
          <img
            src={`${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=64`}
            alt="discord avatar"
          />
          <Typography>{username}</Typography>
        </div>
      </div>
    </section>
  );
}
export default SeventhStep;
