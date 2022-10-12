import React, { useEffect } from 'react';
import "./global.scss";
import {Routes,Route, Navigate} from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { userSession } from './redux/reducers/userReducers';
import Dashboard from './components/pages/Dashboard';
import Friends from './components/pages/Friends/Friends';
import Chat from "./components/pages/Friends/Chat";
import Discover from './components/pages/Discover';




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

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/discover" element={<Discover/>}/>
      <Route path="/friends" element={<Friends/>}>
      <Route path="dm/:id" element={<Chat/>}/>
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard"/>}/>
    </Routes>
  );
}

export default App;
