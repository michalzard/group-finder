import { Typography } from "@mui/material";
import React from "react";
import Header from "../../Header";
import "./ProfileCreation.scss";
import { useNavigate } from "react-router-dom";

import ValorantLogo from "../../../assets/valorant/valorant-logo.svg";
import CSGOLogo from "../../../assets/csgo/csgo-logo.svg";
import RustLogo from "../../../assets/rust/Rust-Game-Logo.png";

function ProfileCreation() {
  return (
    <>
      <Header />
      <main className="profile-prompt">
        <Typography variant="h4" gutterBottom>
          Let's build your profile...
        </Typography>

        <div className="prompt-content">
          <section className="sidebar-info">
            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "white", fontWeight: 400 }}
            >
              To match you with the best teammates,we'll ask you a few
              questions:
            </Typography>
            <Typography variant="body2" gutterBottom>
              1. we'll ask about you as a player.{" "}
            </Typography>
            <Typography variant="body2" gutterBottom>
              2. then we will ask you what you're looking for in your ideal
              teammates.{" "}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              The more information you give us,the better we can match you with
              your future teammates.
            </Typography>
          </section>
          <section className="choose-game">
            <Typography>Choose your game.</Typography>
            <div className="game-list">
              <GameProfileLink gameName={"valorant"} image={ValorantLogo} />
              <GameProfileLink gameName={"csgo"} image={CSGOLogo} />
              <GameProfileLink gameName={"rust"} image={RustLogo} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default ProfileCreation;

function GameProfileLink({ gameName, image }) {
  const navigate = useNavigate();
  if (!gameName && !image) return;
  return (
    <section
      className={`game-link ${gameName}`}
      onClick={() => navigate(`/creation/${gameName.toLowerCase()}/1`)}
    >
      {image ? <img src={image} alt={gameName} /> : null}
    </section>
  );
}
