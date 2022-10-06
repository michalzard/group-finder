import React, { useEffect } from 'react';
import "./global.scss";
import {Routes,Route, Navigate} from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './components/pages/Dashboard';
import { userSession } from './components/redux/reducers/userReducers';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(userSession());
  },[dispatch]);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard"/> : <LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>}/>

      <Route path="/dashboard" element={<Dashboard/>}>

      </Route>
    </Routes>
  );
}

export default App;
