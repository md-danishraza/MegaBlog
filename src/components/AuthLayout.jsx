import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children }) {
  const authStatus = useSelector((state) => state.auth.status);
  console.log("auth status ", authStatus);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect if authStatus is explicitly false
    if (authStatus === false) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  // Waiting until authStatus is determined
  if (authStatus === null) {
    return <div>Loading...</div>;
  }

  // Render children if authenticated
  return <>{authStatus && children}</>;
}

export default AuthLayout;
