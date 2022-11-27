import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import OmenBackground from "../../../../assets/valorant/omen.png";
import "./Step.scss";

export default function FirstStep({ game, nextStep }) {
  const navigate = useNavigate();
  // onClick={() => navigate(`/creation/${game}/${nextStep}`)}
  const nicknameValidation = yup.object().shape({
    nickname: yup.string().required().min(3).max(30),
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      nickname: "",
    },
    validationSchema: nicknameValidation,
    onSubmit: (values, actions) => {
      console.log(values);
      navigate(`/creation/${game}/${nextStep}`);
    },
  });
  const backgroundImageByGame = useCallback((game) => {
    switch (game) {
      case "valorant":
        return `url(${OmenBackground})`;
      case "csgo":
        return `url()`;
      case "rust":
        return;
      default:
        return `url(${OmenBackground})`;
    }
  }, []);

  return (
    <section className="ign">
      <div
        className="background-image"
        style={{
          backgroundImage: backgroundImageByGame(game),
        }}
      />
      <Typography
        variant="h5"
        style={{
          position: "relative",
        }}
      >
        How should we call you ?
      </Typography>
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
              error={Boolean(errors.nickname)}
              helperText={
                touched.nickname && errors.nickname ? errors.nickname : ""
              }
            />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
