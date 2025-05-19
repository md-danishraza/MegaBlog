import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // If the user is not authenticated, redirect to the login page
  if (!authStatus) {
    navigate("/login");
  }

  // If the user is authenticated, render the protected content
  return <>{children}</>;
}

export default AuthLayout;
