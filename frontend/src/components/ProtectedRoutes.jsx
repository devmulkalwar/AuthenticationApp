import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "@/hooks/useGlobalContext"; // Adjust the import path

const ProtectedRoute = () => {
  const { user } = useGlobalContext(); // Get user from global context
  const[currentUser,setCurrentUser] = useState(null);

    useEffect(() => {
        if(user){
            setCurrentUser(user);
        }
    },[user])

  // If the user is not authenticated, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the requested component
  return <Outlet />;
};

export default ProtectedRoute;