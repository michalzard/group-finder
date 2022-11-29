import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import "./GameProfileCreator.scss";
import Header from "../../Header";
//steps
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import FourthStep from "./Steps/FourthStep";
import FifthStep from "./Steps/FifthStep";
import SixthStep from "./Steps/SixthStep";
import SeventhStep from "./Steps/SeventhStep";
import LastStep from "./Steps/LastStep";

function GameProfileCreator() {
  const { game, step } = useParams();
  // const maxSteps = 9;

  return (
    <main className="gameProfileCreator-container">
      <Header />
      <div className="gameProfileCreator">
        <StepNavigation activeStep={parseInt(step)} />
        <StepHandler game={game} activeStep={parseInt(step)} />
      </div>
    </main>
  );
}

export default GameProfileCreator;

function StepNavigation({ activeStep }) {
  const steps = [
    "Nickname",
    "Roles",
    "Rank",
    "Age",
    "Profile",
    "Discord",
    "Summary",
  ];
  return (
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
  );
}

function StepHandler({ game, activeStep }) {
  const nextStep = activeStep + 1;
  switch (activeStep) {
    case 1:
      return <FirstStep game={game} nextStep={nextStep} />;
    case 2:
      return <SecondStep game={game} nextStep={nextStep} />;
    case 3:
      return <ThirdStep game={game} nextStep={nextStep} />;
    case 4:
      return <FourthStep game={game} nextStep={nextStep} />;
    case 5:
      return <FifthStep game={game} nextStep={nextStep} />;
    case 6:
      return <SixthStep game={game} nextStep={nextStep} />;
    case 7:
      return <SeventhStep game={game} nextStep={nextStep} />;
    case 8:
      return <LastStep game={game} nextStep={nextStep} />;
    default:
      return <FirstStep game={game} nextStep={nextStep} />;
  }
}
