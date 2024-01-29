import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from './pages/AuthPage/AuthPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MainPage from './pages/MainPage/MainPage';

const Routing = () => {
  return (
    <>
        <Routes>
            <Route path='/main/:id/*' element={<MainPage/>}/>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/registration' element={<RegistrationPage/>}/>
            <Route path='*' element={<>404</>}/>
        </Routes>
    </>
  )
}

export default Routing