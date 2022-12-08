import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Yoru from "../../../../assets/valorant/yoru.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setBio, setImage } from "../../../../redux/slices/profileCreation";

function FifthStep({ game, nextStep }) {
  const avatarSize = "60px";
  const [avatarSrc, setAvatarSrc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadFile = (file) => {
    if (!file) return;
    const fData = new FormData();
    fData.append("avatar", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, fData, {
        withCredentials: true,
      })
      .then((data) => {
        const { message, avatarURL } = data.data;
        console.log(message);
        if (avatarURL) {
          dispatch(setImage(avatarURL));
          setAvatarSrc(avatarURL); //to display it rightaway in creator
        }
      })
      .catch((err) => console.log(err));
  };

  const { bio } = useSelector((state) => state.profileCreator.profile);

  const bioValidationSchema = yup.object().shape({
    bio: yup.string().max(200).required(),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      bio,
    },
    validationSchema: bioValidationSchema,
    onSubmit: (values, actions) => {
      dispatch(setBio(values.bio));
      navigate(`/creation/${game}/${nextStep}`);
      actions.resetForm();
    },
  });

  return (
    <section className="game-profile-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${Yoru})` }}
      />
      <form className="game-profile-info" onSubmit={handleSubmit}>
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
            value={values.bio}
            error={Boolean(errors.bio)}
            name="bio"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.bio && Boolean(errors.bio) ? errors.bio : ""}
            fullWidth
          />
          <Button
            variant="outlined"
            type="submit"
            disabled={isSubmitting}
            color="secondary"
          >
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}

export default FifthStep;
