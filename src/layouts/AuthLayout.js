import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRole } from "../features/auth/authSlice";

function AuthLayout({ children }) {
  const isLoggedIn = useAuth();

  let nevigate = "/brand";

  return !isLoggedIn ? children : <Navigate to={nevigate} />;
}

export default AuthLayout;
