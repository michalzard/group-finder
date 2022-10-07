import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/reducers/userReducers";
import "./RegisterPage.scss";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentLocation,setLocation] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleRegistration=()=>{
    dispatch(userRegister({email,username,password}));
  }
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
  if(isLoggedIn) navigate("/dashboard");
  },[isLoggedIn]);

  return (
    <section className="Register">
      <form>
      <Typography variant="h4" gutterBottom>Register</Typography>
        <TextField placeholder="Email" type="email" fullWidth onChange={(e)=>{setEmail(e.target.value);}}/>
        <TextField placeholder="Username" type="text" fullWidth onChange={(e)=>{setUsername(e.target.value);}}/>
        <FormControl fullWidth>
        <InputLabel id="location-label">Locations</InputLabel>
        <Select placeholder="locations" labelId="location-label" value={currentLocation} label="Locations" onChange={(e)=>setLocation(e.target.value)}>
          <MenuItem value={1}>
          Location 1
          </MenuItem>
          <MenuItem value={2}>
          Location 2
          </MenuItem>
          <MenuItem value={3}>
          Location 3
          </MenuItem>
          <MenuItem value={4}>
          Location 4
          </MenuItem>
        </Select>

        </FormControl>

        <hr />

        <TextField placeholder="Password" type="password" fullWidth onChange={(e)=>{setPassword(e.target.value);}} />
        <TextField placeholder="Confirm Password" type="password" fullWidth />
        <section className="form-footer">
          <Button variant="outlined" onClick={handleRegistration}>Register</Button>
          <Typography variant="subtitle2" onClick={()=>{navigate("/login")}}>
            Already have account? Login
          </Typography>
        </section>
      </form>
    </section>
  );
}

export default RegisterPage;
