import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GameProfileCreator.scss";
import Header from "../../Header";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useFormik } from "formik";
import * as yup from "yup";

function GameProfileCreator() {
  const { game, step } = useParams();
  // const maxSteps = 9;

  return (
    <main className="gameProfileCreator-container">
      <Header />
      <div className="gameProfileCreator">
        <StepNavigation activeStep={parseInt(step)} />
        <FirstStep game={game} nextStep={parseInt(step) + 1} />
      </div>
    </main>
  );
}

export default GameProfileCreator;

const steps = [
  "Ign",
  "Roles",
  "Rank",
  "Teammate age",
  "Teammate type",
  "Location",
  "Profile",
  "3rd party",
];

function StepNavigation({ activeStep }) {
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

function FirstStep({ game, nextStep }) {
  const navigate = useNavigate();
  // onClick={() => navigate(`/creation/${game}/${nextStep}`)}
  const nicknameValidation = yup.object().shape({
    nickname: yup.string().required().min(3).max(30),
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        nickname: "",
      },
      validationSchema: nicknameValidation,
      onSubmit: (values, actions) => {
        console.log(values);
        navigate(`/creation/${game}/${nextStep}`);
      },
    });
  return (
    <section className="ign">
      <Typography variant="h5">How should we call you ?</Typography>
      <form onSubmit={handleSubmit}>
        <div className="info">
          <div className="ign-info-left">
            <Typography variant="subtitle1">
              <ContactSupportIcon /> Your name
            </Typography>
            <Typography variant="body2">
              This will be your display name or ingame name visible to other
              players.
            </Typography>
          </div>
          <div className="ign-info-right">
            <TextField
              placeholder="Enter your nickname"
              name="nickname"
              fullWidth
              value={values.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
