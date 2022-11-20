import { Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../Header";
import "./UserProfile.scss";
import Select from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";

import Countries from "../countries.json";
import Languages from "../languages.json";
import { useSelector } from "react-redux";

function UserProfile() {
  const { email, username } = useSelector((state) => state.auth.user);
  //email needs to be save in useState since its inside textfield that can change its value before saving
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (email) {
      setUserEmail(email);
    } //if email isnt undefined set it
  }, [email]);
  const loadCountryList = useCallback(() => {
    const list = [];
    for (let i = 0; i < Object.keys(Countries).length; i++) {
      const v = Object.values(Countries)[i];
      const k = Object.keys(Countries)[i];
      list.push({ value: k, label: v });
    }
    return list;
  }, [Countries]);

  const loadLanguageList = useCallback(() => {
    const list = [];
    for (let i = 0; i < Object.keys(Languages).length; i++) {
      const v = Object.values(Languages)[i];
      const k = Object.keys(Languages)[i];
      list.push({ value: k, label: v });
    }
    return list;
  }, [Languages]);

  const [countryOptions, setCountryOptions] = useState([]);

  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    setCountryOptions(loadCountryList());
    setLanguageOptions(loadLanguageList());
  }, []);

  const multiSelectStyle = {
    control: (styles) => ({ ...styles, backgroundColor: "#1e2024" }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "hsl(297, 65%, 71%);" : "#1e2024",
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#121417",
      };
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        color: "white",
        fontFamily: "Roboto,sans-serif",
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color: "white",
      };
    },
    input: (styles) => {
      return {
        ...styles,
        color: "white",
      };
    },
  };
  const maxNumberProps = (min, max) => {
    return { inputProps: { min, max } };
  };

  // const userProfileValidation = yup.object().shape({});
  // const {
  //   errors,
  //   values,
  //   isSubmitting,
  //   touched,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  // } = useFormik({
  //   initialValues: {
  //     email: "",
  //     birthDay: "",
  //     location: "",
  //     currentPasswrod: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: "yup schema",
  //   onSubmit: (values, actions) => {},
  // });
  return (
    <>
      <Header />
      <main className="userProfileCustomization">
        <form className="userProfileForm">
          <Typography color="white" variant="h4" gutterBottom>
            User Profile
          </Typography>
          <div className="info">
            <Typography color="white" variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <div className="field">
              <label>Email</label>
              <TextField
                fullWidth
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Day of birth</label>
              <div className="date">
                <TextField
                  placeholder="DD"
                  type="number"
                  InputProps={maxNumberProps(1, 31)}
                />
                <TextField
                  placeholder="MM"
                  type="number"
                  InputProps={maxNumberProps(2, 12)}
                />
                <TextField
                  placeholder="YYYY"
                  type="number"
                  InputProps={maxNumberProps(1900, new Date().getFullYear())}
                />
              </div>
            </div>
            <div className="field">
              <label>Location</label>
              <Select
                styles={multiSelectStyle}
                id="select"
                options={countryOptions}
              />
            </div>
            <div className="field lang">
              <label>Languages</label>
              <Select
                styles={multiSelectStyle}
                isMulti
                id="select"
                options={languageOptions}
              />
            </div>
            <div className="field col">
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField placeholder="Current Password" fullWidth />
              <TextField placeholder="New Password" fullWidth />
              <TextField placeholder="Confirm Password" fullWidth />
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: "15px" }}
                // type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default UserProfile;
