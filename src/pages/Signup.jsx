import React from "react";

import SignupComponent from "../components/SignUp";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      navigate("/"); // Redirect authenticated users to the home page
    }
  }, [authStatus, navigate]);
  return (
    <div className="py-8">
      <SignupComponent />
    </div>
  );
}

export default Signup;
