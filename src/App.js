import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/userPages/homePage/Home'
import Login from './pages/userPages/loginPage/Login'
import Register from './pages/userPages/registerPage/Register'
import Favorite from './pages/userPages/favoritePage/Favorite'
import Cart from './pages/userPages/cartPage/Cart'
import Confirmed from './pages/userPages/confirmedPage/Confirmed'
import Profile from './pages/userPages/userPorfile/Profile'
import SenderResetPassword from './pages/userPages/senderResetPasswordPage/SenderResetPassword'
import ResetPassword from './pages/userPages/resetPasswordPage/ResetPassword'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/confirmed/:userToken' element={<Confirmed />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/senderResetPassword' element={<SenderResetPassword />} />
      <Route path='/resetPassword/:userToken' element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
