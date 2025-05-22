import React from "react";

import LoginComponent from "../components/Login";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      navigate("/"); // Redirect authenticated users to the home page
    }
  }, [authStatus, navigate]);
  return (
    <div className="py-8">
      <LoginComponent />
    </div>
  );
}

export default Login;
