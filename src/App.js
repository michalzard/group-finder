import React from 'react';
import "./global.scss";
import {Routes,Route} from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
