import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../redux/reducers/userReducers";
import "./LoginPage.scss";
import { useFormik } from "formik";
import * as yup from "yup";


function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    username:yup.string().required().min(2).max(20),
    password:yup.string().required().min(5),
  })
  const {values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting} = useFormik({
    initialValues:{
      username:"",
      password:"",
    },
    validationSchema: loginValidationSchema,
    onSubmit:(values,actions)=>{
      dispatch(userLogin({username:values.username,password:values.password}));
      actions.resetForm();
    }
  });
  

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn,navigate]);
  console.log(errors,touched);
  console.log(errors.username && touched.username)
  return (
    <section className="Login">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <TextField
          variant="outlined"
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={Boolean(errors.username && touched.username)}
          helperText={touched.username ? errors.username : ""}
        />

        <TextField
          variant="outlined"
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          required
          error={Boolean(errors.password && touched.password)}
          helperText={touched.password ? errors.password : ""}
        />
        <section className="log-btn">
          <Typography variant="subtitle1" gutterBottom>Forgot Password?</Typography>
          <Button variant="outlined" type="submit" disabled={isSubmitting}>Login</Button>
        </section>
        {/* This is gonna be divider */}
        <hr />
        <Typography variant="body2" gutterBottom>
          Don't have account yet? Register today!
        </Typography>
        <Typography variant="caption" gutterBottom className="description">
          Let us know what you are interested in.
        </Typography>
        <section>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
          <Typography
            variant="subtitle1"
            onClick={() => {
              navigate("/");
            }}
          >
            Learn More
          </Typography>
        </section>
      </form>
    </section>
  );
}

export default LoginPage;

/**
 * Cookie popup notification bottom left
 */
