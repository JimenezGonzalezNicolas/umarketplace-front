import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../modules/home/pages/home";
import Login from "../modules/login/pages/login";
import Report from "../modules/shared/components/reported";
import Profile from "../modules/shared/components/profile";
import Cart from "../modules/shared/components/cart";
import SellerProfile from "../modules/shared/components/seller-profile";
import Register from "../modules/shared/components/register";
import PrivateRoute from "./private-route";
import Success from "../modules/shared/components/success";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sell" element={<SellerProfile />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
