import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  useEffect(() => {
    //everytime player gets to login page request session check,log him into account is session active
    //do nothing if expired
  }, []);
  const navigate = useNavigate();
  
  const handleLogin=()=>{
    console.log("login")
  }
  
  
  return (
    <section className="Login">
      <form>
        <Typography variant="h4" gutterBottom>Log in</Typography>
        <TextField variant="outlined" placeholder="Nickname" type="text" fullWidth/>
        <TextField variant="outlined" placeholder="Password" type="password" fullWidth/>
        <section className="log-btn">
        <Typography variant="subtitle1"gutterBottom>Forgot Password?</Typography>
        <Button variant="outlined" onClick={handleLogin}>Login</Button>
        </section>
        {/* This is gonna be divider */}
        <hr/>
        <Typography variant="body2"gutterBottom>
          Don't have account yet? Sign up today!
        </Typography>
        <Typography variant="caption" gutterBottom className="description">
          Let us know what you are interested in.
        </Typography>
        <section>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </Button>
        <Typography variant="subtitle1" onClick={()=>{navigate("/")}}>Learn More</Typography>
        </section>
      </form>
    </section>
  );
}

export default LoginPage;

/**
 * Cookie popup notification bottom left
 */
