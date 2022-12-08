import { Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Skye from "../../../../assets/valorant/skye.jpg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DiscordLogo } from "../../../../assets/discord-logo.svg";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import agentData from "../../../../assets/valorant/agents/agentData";
import valorantRanks from "../../../../assets/valorant/ranks/rankData";

function SeventhStep({ game, nextStep }) {
  const DISCORD_CDN = "https://cdn.discordapp.com";
  const { id, avatar, username } = useSelector(
    (state) => state.auth.user.discord
  );

  const { nickname, roles, agents, rank, age, profile } = useSelector(
    (state) => state.profileCreator
  );
  const navigate = useNavigate();
  const baseBackLocation = `/creation/${game}/`;

  const getAgentIcon = useCallback((agentName) => {
    const index = agentData.findIndex(
      (data) => data.name.toLowerCase() === agentName
    );
    if (index !== -1) return agentData[index].icon;
    return;
  }, []);

  const getRankIcon = useCallback((rankValue) => {
    //valorantRanks
    const index = valorantRanks.findIndex((rank) => rank.value === rankValue);
    if (index !== -1) return valorantRanks[index].src;
    return;
  }, []);

  return (
    <section className="game-profile-summary-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${Skye})` }}
      />
      <div className="game-profile-info">
        <Typography variant="subtitle1">
          <ContactSupportIcon />
          This page serves for finalizing your profile.
        </Typography>
        <Typography gutterBottom variant="body1" color="lightgray">
          This page serves for finalizing your profile.
        </Typography>
        <Typography gutterBottom variant="body2" color="lightgray">
          After you check that all of values you selected are correct you can
          press publish button to create <b>matchmaking profile</b> and you'll
          gain access to <b>discover channels.</b>
        </Typography>
      </div>
      <div className="game-profile-summary">
        <div className="summary-labels">
          <Typography gutterBottom>Nickname</Typography>
          <Typography gutterBottom>Age</Typography>
          <Typography gutterBottom>Roles</Typography>
          <Typography gutterBottom>Agents</Typography>
          <Typography gutterBottom>Rank</Typography>
          <Typography gutterBottom>Profile</Typography>
          <Typography gutterBottom>Discord</Typography>
        </div>
        <div className="summary-values">
          <SummaryValue
            displayValue={nickname}
            backLocation={baseBackLocation + "1"}
          />
          <SummaryValue
            displayValue={age}
            backLocation={baseBackLocation + "2"}
          />
          <SummaryValue
            displayValue={
              roles.length > 0 ? roles.map((role) => `${role},`) : null
            }
            backLocation={baseBackLocation + "3"}
          />
          <SummaryValue
            displayValue={
              <>
                {agents.length > 0 ? (
                  agents.map((agent, i) => {
                    if (i < 3) {
                      return (
                        <img
                          key={agent}
                          alt={`${agent} icon`}
                          style={{ width: 40, height: 40 }}
                          src={`${getAgentIcon(agent)}`}
                        />
                      );
                    } else return null;
                  })
                ) : (
                  <span style={{ color: "lightgray" }}>Missing value ...</span>
                )}
                {agents.length > 3 ? "..." : null}
              </>
            }
            backLocation={baseBackLocation + "4"}
          />
          <SummaryValue
            displayValue={
              rank ? (
                <img width={30} height={30} src={getRankIcon(rank)} />
              ) : null
            }
            backLocation={baseBackLocation + "5"}
          />

          <SummaryValue
            displayValue={
              profile.bio ? (
                <span style={{ color: "green" }}>Submitted</span>
              ) : null
            }
            backLocation={baseBackLocation + "6"}
          />
          <div className="discord-value">
            {username ? (
              <>
                <img
                  src={`${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=64`}
                  alt="discord avatar"
                />
                <Typography>{username}</Typography>
                <EditIcon onClick={() => navigate(baseBackLocation + "7")} />
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                endIcon={<DiscordLogo className="discord-icon" />}
                onClick={() => navigate(baseBackLocation + "6")}
              >
                Link your account
              </Button>
            )}
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              console.log(
                "send whole redux state to /create profile endpoint that creates profile that'll be used by matchmaking system aswell as redirect user to /discover and automatically set filter options to include game that user was creating profile for"
              )
            }
          >
            Publish
          </Button>
        </div>
      </div>
    </section>
  );
}
export default SeventhStep;

function SummaryValue({ displayValue, backLocation }) {
  const navigate = useNavigate();
  return (
    <div className="summary-value">
      <Typography gutterBottom color={displayValue ? "white" : "lightgray"}>
        {displayValue ? displayValue : "Missing value ..."}
      </Typography>
      <EditIcon onClick={() => navigate(backLocation)} />
    </div>
  );
}
