import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import ValorantLogo from "../../../../assets/valorant/valologo.png";
import AddIcon from "@mui/icons-material/Add";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function FifthStep() {
  const avatarSize = "60px";
  const [avatarSrc, setAvatarSrc] = useState("");
  const uploadFile = (file) => {
    if (!file) return;
    const fData = new FormData();
    fData.append("avatar", file);

    axios.post(`${process.env.REACT_APP_API_URL}/upload`,fData,{withCredentials:true}).then((data) => {
        const { message, avatarURL } = data.data;
        if (avatarURL) {
          //TODO: save url to redux
          setAvatarSrc(avatarURL);
        }
      })
      .catch((err) => console.log(err));
  };

  const bioValidationSchema = yup.object().shape({
    bio:yup.string().min(5).max(200).required(),
  })
  const {values,errors,touched,handleBlur,handleChange,handleSubmit,isSubmitting} = useFormik({
    initialValues:{
      bio:"",
    },
    validationSchema:bioValidationSchema,
    onSubmit:(values,actions)=>{
      console.log(values);
      actions.resetForm();
    },
  })
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
          <input
            type="file"
            id="avatar-upload"
            accept="image/png,image/jpg"
            style={{ display: "none" }}
            onChange={(e) => uploadFile(e.target.files[0])}
          />
          <label htmlFor="avatar-upload">
            <Avatar
              src={avatarSrc}
              sx={{ width: avatarSize, height: avatarSize }}
            >
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
          <Button variant="outlined" type="submit" disabled={isSubmitting} color="secondary">
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}

export default FifthStep;
