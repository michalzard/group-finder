import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import GroupsLogo from "../assets/groups-logo.png";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/reducers/userReducers";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Select from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function Header() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <header>
      <section className="nav">
        <Link to="/dashboard">
          <HomeIcon />
        </Link>
        <Link to="/discover">
          <SearchIcon /> {isMobile ? "" : <Typography>Discover</Typography>}
        </Link>
        <Link to="/friends/all">
          <GroupIcon /> {isMobile ? "" : <Typography>Friends</Typography>}
        </Link>
      </section>
      {isMobile ? null : (
        <section className="logo">
          <img src={GroupsLogo} alt="Groups Logo" />
        </section>
      )}

      <section className="menu">
        <AddCircleOutlineIcon
          className="plus"
          onClick={() => navigate("/profilecreation")}
        />
        <DensityMediumIcon
          onClick={(e) => {
            setMenuAnchor(e.currentTarget);
          }}
        />
      </section>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
        disableScrollLock={true}
        id="userProfileMenu"
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <PersonIcon />
          Edit my profile
        </MenuItem>
        {/* Popup dialog window with form to submit feedback */}
        <MenuItem onClick={() => setOpen(true)}>
          <FeedbackIcon />
          Submit a feedback
        </MenuItem>
        <MenuItem onClick={() => navigate("/faq")}>
          <HelpIcon /> Help / Faq
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(userLogout());
          }}
        >
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </Menu>
      <FeedbackDialog open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;

function FeedbackDialog({ open, setOpen }) {
  const selectStyle = {
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "hsl(297, 65%, 71%);" : "#1e2024",
        fontFamily: "Roboto,sans-serif",
      };
    },

    singleValue: (styles) => {
      return {
        ...styles,
        color: "white",
        backgroundColor: "#1e2024",
        fontFamily: "Roboto,sans-serif",
      };
    },
    input: (styles) => {
      return {
        ...styles,
        color: "white",
      };
    },
  };

  const feedbackOptions = [
    {
      value: "bug",
      label: "Found a bug",
      placeholder: `1. Short and explicit description of your incident...\n2. How to reproduce said issue\nGo to ...\nScroll down to ....\nSee Error`,
    },
    {
      value: "suggestion",
      label: "Suggest new Feature",
      placeholder: `1.Suggest any of your ideas you think would improve this website overall\n2. Why would our website benefit by adding this feature`,
    },
  ];

  const feedbackValidationSchema = yup.object().shape({
    title: yup.object().required(),
    text: yup.string().required().min(50).max(1000),
  });

  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: feedbackOptions[0],
      text: "",
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: (values, actions) => {
      axios.post(`${process.env.REACT_APP_API_URL}/feedback/new`,{title:values.title.label,text:values.text},{withCredentials:true}).then(data=>{
        console.log(data);
      }).catch(err=>console.log(err));
      actions.resetForm();
      setOpen(false);
    },
  });

  const [currentSelection, setSelection] = useState(feedbackOptions[0]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="feedBackDialog">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Submit a feedback</DialogTitle>
        <DialogContent>
          <Select
            id="feedback-select"
            styles={selectStyle}
            options={feedbackOptions}
            defaultValue={feedbackOptions[0]}
            name="title"
            onChange={(e) => {
              setFieldValue("title", e);
              setSelection(e);
            }}
            onBlur={handleBlur}
            value={values.title}
          />

          <TextField
            placeholder={currentSelection.placeholder}
            color="secondary"
            multiline={true}
            rows={5}
            fullWidth
            name="text"
            id="text"
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(touched.text && errors.text)}
            helperText={touched.text && errors.text ? errors.text : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button color="info" variant="outlined" type="submit">
            Submit
          </Button>
          <Button color="error" variant="outlined" onClick={()=>setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

