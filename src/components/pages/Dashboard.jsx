import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../Header";

function Dashboard() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn ? 
        <>
          <Header />
          <Typography color="white">
            Dashboard Route protected by login
          </Typography>
        </>
       : <Navigate to="/" />
      }
    </>
  );
}

export default Dashboard;
