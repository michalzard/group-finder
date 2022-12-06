import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

//bg
import Jett from "../../../../assets/valorant/jett.jpg";
import { useDispatch } from "react-redux";
import { setRoles } from "../../../../redux/slices/profileCreation";

function SecondStep({ game, nextStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRoles, setRole] = useState([]);

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
            <RoleButton roleName={"Entry"} setRole={setRole} />
            <RoleButton roleName={"Rifle"} setRole={setRole} />
            <RoleButton roleName={"Sniper"} setRole={setRole} />
            <RoleButton roleName={"Strategist"} setRole={setRole} />

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                dispatch(setRoles(selectedRoles));
                navigate(`/creation/${game}/${nextStep}`);
              }}
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

function RoleButton({ roleName, setRole }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="role-button"
      onClick={() => {
        setChecked(!checked);
        if (!checked) setRole((prev) => [...prev, roleName]);
        else {
          setRole((prev) => prev.filter((role) => role !== roleName));
        }
      }}
    >
      <Typography variant="subtitle2">{roleName}</Typography>
      <Checkbox checked={checked} />
    </div>
  );
}
