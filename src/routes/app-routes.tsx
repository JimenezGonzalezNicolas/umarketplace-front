import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../modules/home/pages/home";
import Login from "../modules/login/pages/login";
import Report from "../modules/shared/components/reported";
import Profile from "../modules/shared/components/profile";
import Cart from "../modules/shared/components/cart";
import Sell from "../modules/shared/components/sell";
import Register from "../modules/shared/components/register";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/my-profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
