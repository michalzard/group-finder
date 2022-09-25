import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss";

function RegisterPage() {
  const navigate = useNavigate();
  const [currentLocation,setLocation] = useState("");

  const handleRegistration=()=>{
    console.log("reg handler");
  }

  return (
    <section className="Register">
      <form>
        <Typography variant="h4">Already have an account?</Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </Button>

        <hr />

        <Typography variant="h5">Your details</Typography>
        <TextField placeholder="Email" type="email" fullWidth />
        <TextField placeholder="Username" type="text" fullWidth />
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

        <TextField placeholder="Password" type="password" fullWidth />
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
