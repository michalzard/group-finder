import { Fab, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GameProfileCreator.scss";
import Header from "../../Header";
//steps
import Nickname from "./Steps/Nickname";
import Roles from "./Steps/Roles";
import Agents from "./Steps/Agents";
import Rank from "./Steps/Rank";
import Age from "./Steps/Age";
import ProfileInfo from "./Steps/ProfileInfo";
import Integration from "./Steps/Integration";
import Summary from "./Steps/Summary";
import NavigationIcon from "@mui/icons-material/Navigation";

function GameProfileCreator() {
  const { game, step } = useParams();
  // const maxSteps = 9;

  return (
    <main className="gameProfileCreator-container">
      <Header />
      <div className="gameProfileCreator">
        <StepNavigation game={game} activeStep={parseInt(step)} />
        <StepHandler game={game} activeStep={parseInt(step)} />
      </div>
    </main>
  );
}

export default GameProfileCreator;

function StepNavigation({ game, activeStep }) {
  const navigate = useNavigate();
  const steps = [
    "Nickname",
    "Age",
    "Roles",
    "Agents",
    "Rank",
    "Profile",
    "Discord",
    "Summary",
  ];
  return (
    <>
      <Stepper
        activeStep={activeStep - 1}
        alternativeLabel
        className="step-navigation"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep !== steps.length ? (
        <Fab
          className="skip-to-summary"
          size="medium"
          variant="circular"
          onClick={() => navigate(`/creation/${game}/${steps.length}`)}
        >
          <NavigationIcon />
          {/* Skip to summary */}
        </Fab>
      ) : null}
    </>
  );
}

function StepHandler({ game, activeStep }) {
  const nextStep = activeStep + 1;
  switch (activeStep) {
    case 1:
      return <Nickname game={game} nextStep={nextStep} />;
    case 2:
      return <Age game={game} nextStep={nextStep} />;
    case 3:
      return <Roles game={game} nextStep={nextStep} />;
    case 4:
      return <Agents game={game} nextStep={nextStep} />;
    case 5:
      return <Rank game={game} nextStep={nextStep} />;
    case 6:
      return <ProfileInfo game={game} nextStep={nextStep} />;
    case 7:
      return <Integration game={game} nextStep={nextStep} />;
    case 8:
      return <Summary game={game} nextStep={nextStep} />;
    default:
      return <Nickname game={game} nextStep={nextStep} />;
  }
}
