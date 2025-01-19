import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const isAuthenticated = storedUser ? true : false;

  useEffect(() => {
    if (!storedUser) {
      // Optionally, you can add logging or state updates here
      console.log("No stored user found. Redirecting to login...");
    }
  }, [storedUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
