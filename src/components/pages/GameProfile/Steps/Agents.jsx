import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import KJ from "../../../../assets/valorant/kj.jpg";
import "./Step.scss";
import agentData from "../../../../assets/valorant/agents/agentData";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useDispatch } from "react-redux";
import { setAgents } from "../../../../redux/slices/profileCreation";
import { useNavigate } from "react-router-dom";

function Agents({ game, nextStep }) {
  const [selectedAgents, selectAgent] = useState(["phoenix"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="agent-selection-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${KJ})` }}
      />
      <Typography gutterBottom variant="h4" style={{ position: "relative" }}>
        Select your agents
      </Typography>
      <div className="agent-selector">
        <div className="agent-selection-info">
          <Typography variant="h6">
            <ContactSupportIcon /> Matchmaking Rank
          </Typography>
          <Typography variant="subtitle1" color="lightgray">
            Allows us to match you with people at your skill level.
          </Typography>
        </div>
        <div className="agents">
          {agentData.map((agent) => (
            <AgentButton
              key={agent.name}
              name={agent.name}
              icon={agent.icon}
              selected={selectedAgents.includes(agent.name.toLowerCase())}
              select={selectAgent}
            />
          ))}
        </div>
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          dispatch(setAgents(selectedAgents));
          navigate(`/creation/${game}/${nextStep}`);
        }}
      >
        Continue
      </Button>
    </section>
  );
}

export default Agents;

function AgentButton({ icon, name, select, selected }) {
  return (
    <img
      className={`agent-button ${selected ? "agent-selected" : null}`}
      name={name}
      src={icon}
      alt="Agent Icon"
      onClick={(e) =>
        select((prev) => {
          const aName = e.target.name.toLowerCase();
          if (prev.includes(aName)) {
            const filtered = prev.filter((agent) => agent !== aName);
            return filtered;
          } else return [...prev, aName];
        })
      }
    />
  );
}
