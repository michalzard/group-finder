import { Avatar, Button, TextField, Typography } from "@mui/material";
import React from "react";
// import ValorantLogo from "../../../../assets/valorant/valologo.png";
import AddIcon from "@mui/icons-material/Add";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useFormik } from "formik";
import * as yup from "yup";

function FifthStep() {
  const avatarSize = "60px";
  return (
    <section className="game-profile-container">
      <form className="game-profile-info">
        <div className="info-left">
          <Typography variant="h5">
            <ContactSupportIcon /> Profile Information
          </Typography>
          <Typography variant="subtitle1">Avatar</Typography>
          <Typography variant="subtitle2" color="lightgray">
            This photo will be at the top of your profile to add some flair.If
            you don't upload an image,we will just use default picture.
          </Typography>
          <Typography variant="subtitle1">Bio</Typography>
          <Typography variant="subtitle2" color="lightgray">
            This text is on your profile to tell people little more about
            yourself.
            <br />
            Limited to 200 characters.
          </Typography>
        </div>
        <div className="info-right">
          <input type="file" id="avatar-upload" accept="image/png,image/jpg" style={{display:"none"}}/>
          <label htmlFor="avatar-upload">
          <Avatar sx={{ width: avatarSize, height: avatarSize }}>
            <AddIcon className="avatar-overlay" />
          </Avatar>
          </label>

          <TextField
            variant="outlined"
            color="secondary"
            className="bio"
            multiline
            focused
            inputProps={{
              style: { color: "white" },
            }}
            rows={5}
            placeholder="Bio (200)"
            fullWidth
          />
          <Button variant="outlined" color="secondary">
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}

export default FifthStep;
