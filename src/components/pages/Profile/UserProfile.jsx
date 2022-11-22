import { Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../Header";
import "./UserProfile.scss";
import Select from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";

import Countries from "../countries.json";
import Languages from "../languages.json";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../../redux/reducers/userReducers";

function UserProfile() {
  const { email, languages, location, birthday } = useSelector(
    (state) => state.auth.user
  );

  const loadJSON = (list) => {
    const result = [];
    for (let i = 0; i < Object.keys(list).length; i++) {
      const v = Object.values(list)[i];
      const k = Object.keys(list)[i];
      result.push({ value: k, label: v });
    }
    return result;
  };

  const loadCountryList = useCallback(() => {
    return loadJSON(Countries);
  }, []);

  const loadLanguageList = useCallback(() => {
    return loadJSON(Languages);
  }, []);

  const [countryOptions, setCountryOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCountryOptions(loadCountryList());
    setLanguageOptions(loadLanguageList());
  }, [loadCountryList, loadLanguageList]);

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
  const userProfileValidation = yup.object().shape({
    //email,birthday,location,languages,current,new,confirm  passwords
    email: yup.string().email("Enter valid email").required(),
    birthday: yup.date().required(),
    location: yup.string().required(),
    currentPassword: yup.string().min(5).max(30).notRequired(),
    newPassword: yup.string().min(5).max(30).notRequired(),
    confirmPassword: yup
      .string()
      .min(5)
      .max(30)
      .notRequired()
      .oneOf([yup.ref("newPassword")], "Passwords need to match"),
  });
  const {
    errors,
    values,
    isSubmitting,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email,
      birthday: new Date().toISOString().substring(0, 10),
      location: "",
      languages: [], //generate language objects from srvr response that returns just strings of langs
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: userProfileValidation,
    onSubmit: (values, actions) => {
      dispatch(userUpdate(values));
      actions.setSubmitting(false);
    },
  });

  const errorStyle = {
    color: "red",
    marginLeft: "25px",
  };

  const langInputRef = useRef(null);
  const locationRef = useRef(null);

  /**
   * I should be using callback ref 
   * https://stackoverflow.com/questions/55838351/how-do-we-know-when-a-react-ref-current-value-has-changed
   * 
   */
  useEffect(() => {
    const options = locationRef.current.props.options;
    const locationObj = options.filter((loc) => loc.label === location)[0];
    if (locationObj) {
      setFieldValue("location", locationObj);
    }
    return () => setFieldValue("location", []);
    //eslint-disable-next-line
  }, [locationRef.current, setFieldValue, location]);

  useEffect(() => {
    const props = langInputRef.current.props;
    const options = props.options;
    if (options.length > 0) {
      const localLang = options.filter(
        (lang) => lang.value === navigator.language.split("-")[0]
      )[0];
      setFieldValue("languages", [localLang]);
    }
    return () => setFieldValue("languages", []);
    //eslint-disable-next-line
  }, [langInputRef.current, setFieldValue]);

  console.log(values);
  return (
    <>
      <Header />
      <main className="userProfileCustomization">
        <form className="userProfileForm" onSubmit={handleSubmit}>
          <Typography color="white" variant="h4" gutterBottom>
            User Profile
          </Typography>
          <div className="info">
            <Typography
              color="white"
              variant="h6"
              style={{ marginLeft: "20px" }}
              gutterBottom
            >
              Personal Information
            </Typography>
            <div className="field">
              <label>Email</label>
              <TextField
                fullWidth
                name="email"
                value={values.email ? values.email : ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email)}
                helperText={
                  touched.email && Boolean(errors.email) ? errors.email : ""
                }
              />
            </div>
            <div className="field birthday">
              <label>Date of birth</label>
              <div className="date">
                <TextField
                  type="date"
                  fullWidth
                  defaultValue={values.birthday}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.birthday)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    touched.birthday && Boolean(errors.birthday)
                      ? errors.birthday
                      : ""
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Location</label>
              <Select
                styles={multiSelectStyle}
                id="select"
                name="location"
                options={countryOptions}
                value={values.location}
                //setFieldValue("location", e.label)
                onChange={(e) => setFieldValue("location", e)}
                onBlur={handleBlur}
                ref={locationRef}
              />
            </div>
            <Typography variant="caption" style={errorStyle}>
              {touched.location && Boolean(errors.location)
                ? errors.location
                : ""}
            </Typography>
            <div className="field lang">
              <label>Languages</label>
              <Select
                styles={multiSelectStyle}
                isMulti
                id="select"
                name="languages"
                options={languageOptions}
                value={values.languages}
                onChange={(e) => setFieldValue("languages", e)}
                onBlur={handleBlur}
                error={Boolean(errors.languages)}
                helperText={
                  touched.languages && Boolean(errors.languages)
                    ? errors.languages
                    : ""
                }
                ref={langInputRef}
              />
            </div>
            <Typography variant="caption" style={errorStyle}>
              {touched.languages && Boolean(errors.languages)
                ? errors.languages
                : ""}
            </Typography>
            <div className="field col">
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField
                placeholder="Current Password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                type="password"
                error={Boolean(errors.currentPassword)}
                helperText={
                  touched.currentPassword && Boolean(errors.currentPassword)
                    ? errors.currentPassword
                    : ""
                }
              />
              <TextField
                placeholder="New Password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                type="password"
                error={Boolean(errors.newPassword)}
                helperText={
                  touched.newPassword && Boolean(errors.newPassword)
                    ? errors.newPassword
                    : ""
                }
              />
              <TextField
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                type="password"
                error={Boolean(errors.confirmPassword)}
                helperText={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                    ? errors.confirmPassword
                    : ""
                }
              />
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: "15px" }}
                type="submit"
                disabled={isSubmitting}
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
