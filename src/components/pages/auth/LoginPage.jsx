import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/reducers/userReducers";
import "./LoginPage.scss";
import {handleFormChange,FormValidator} from "../../formHelpers";


function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState,setFormState] = useState({username:"",password:""});



  const handleLogin = async () => {
      const validation = new FormValidator(formState).isString("username").minmax("username",3,5).isRequired("username")
      // .isString("password").isRequired("password")
      const {errors} = validation;
      console.log(errors);
      // dispatch(userLogin({ username, password }));
    
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
    return ()=>{
      setFormState({});
    }
  }, [isLoggedIn,navigate]);

  return (
    <section className="Login">
      <form>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Username"
          type="text"
          name="username"
          onChange={(e) => handleFormChange(e,setFormState)}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => handleFormChange(e,setFormState)}
          fullWidth
        />
        <section className="log-btn">
          <Typography variant="subtitle1" gutterBottom>
            Forgot Password?
          </Typography>
          <Button variant="outlined" onClick={handleLogin}>
            Login
          </Button>
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
