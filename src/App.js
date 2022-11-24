import React, { lazy, Suspense, useEffect } from 'react';
import "./global.scss";
import {Routes,Route, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userSession } from './redux/reducers/userReducers';
import { LinearProgress } from '@mui/material';
const Faq = lazy(()=>import('./components/pages/Faq'));
const UserProfile = lazy(()=>import('./components/pages/Profile/UserProfile'));
const LandingPage = lazy(()=>import('./components/pages/LandingPage'));
const LoginPage = lazy(()=>import('./components/pages/auth/LoginPage'));
const RegisterPage = lazy(()=>import('./components/pages/auth/RegisterPage'));
const Dashboard =lazy(()=>import('./components/pages/Dashboard'));
const Friends =lazy(()=>import('./components/pages/Friends/Friends'));
const Chat =lazy(()=>import('./components/pages/Friends/Chat'));
const FriendStatus =lazy(()=>import('./components/pages/Friends/FriendStatus'));
const Discover =lazy(()=>import('./components/pages/Discover'));



function App() {
  const dispatch = useDispatch();
  const {isLoggedIn,loading} = useSelector(state=>state.auth);

  useEffect(()=>{
    dispatch(userSession());
  },[dispatch]);

  return (
  <Suspense fallback={<LinearProgress color="secondary"/>}>
    <Routes>
      <Route path="/" element={isLoggedIn && !loading ? <Navigate to="/dashboard"/> : <LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>}/>

      <Route path="/dashboard" element={!isLoggedIn && !loading ? <Navigate to="/"/> :  <Dashboard/>}/>
      <Route path="/discover" element={!isLoggedIn && !loading ? <Navigate to="/"/> : <Discover/>}/>

      <Route path="/friends" element={!isLoggedIn && !loading ? <Navigate to="/"/> : <Friends/>}>
        
      <Route path=":display" element={<FriendStatus/>}/>
      <Route path="dm/:id" element={<Chat/>}/>
      </Route>

      <Route path="/profile" element={ !isLoggedIn && !loading ? <Navigate to="/"/> : <UserProfile/>}/>
      <Route path="/faq" element={<Faq/>}/>

      <Route path="*" element={<Navigate to="/dashboard"/>}/>
    </Routes>
  </Suspense>
  );
}

export default App;