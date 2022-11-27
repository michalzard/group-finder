import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

//bg
import Jett from "../../../../assets/valorant/jett.jpg";

function SecondStep({ game, nextStep }) {
  const navigate = useNavigate();

  return (
    <section className="roles-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${Jett})`,
        }}
      />
      <div className="roles-explanation">
        <div className="roles-info">
          <Typography variant="subtitle1" gutterBottom>
            <ContactSupportIcon />
            Choose a role that represents your playstyle.
          </Typography>
          <Typography>Entry</Typography>
          <Typography variant="body2" color="lightgray">
            You are first in taking duels.
          </Typography>
          <Typography>Rifle</Typography>
          <Typography variant="body2" color="lightgray">
            You prefer to play with only rifles.
          </Typography>
          <Typography>Sniper</Typography>
          <Typography variant="body2" color="lightgray">
            You prefer to play with only sniper rifles.
          </Typography>
          <Typography>Strategist</Typography>
          <Typography variant="body2" color="lightgray">
            You define game strategy and practice tactics with the rest.
          </Typography>
        </div>
        <div className="roles">
          <Typography
            variant="h5"
            style={{ position: "relative" }}
            gutterBottom
          >
            What roles do you play?
          </Typography>
          <div className="roles-select">
            <RoleButton roleName={"Entry"} />
            <RoleButton roleName={"Rifle"} />
            <RoleButton roleName={"Sniper"} />
            <RoleButton roleName={"Strategist"} />

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(`/creation/${game}/${nextStep}`)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecondStep;

function RoleButton({ roleName }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="role-button" onClick={() => setChecked(!checked)}>
      <Typography variant="subtitle2">{roleName}</Typography>
      <Checkbox checked={checked} />
    </div>
  );
}
