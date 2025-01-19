import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "@/hooks/useGlobalContext";

const SERVER_URL = "http://localhost:3000/api/auth";

// Create a provider component
export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleToast = (message, status) => {
    const toastType = {
      success: toast.success,
      error: toast.error,
      info: toast.info,
    };

    if (toastType[status]) {
      toastType[status](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // register function
  const register = async (data) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);
  
    try {
      const response = await axios.post(`${SERVER_URL}/register`, data, {
        withCredentials: true,
      });
  
      console.log(response);
  
      // Handle successful response
      const user = response.data.user;
      const message = response.data.message;
  
      // Set user and message
      setUser(user);
      setMessage(message);
      setIsAuthenticated(true);
  
      // Display success toast
      handleToast("Registration successful! Please verify your OTP.", "success");
  
      // Navigate to the OTP verification page
      navigate("/verify-otp"); 
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
  
      // Display error toast
      handleToast(errorMessage, "error");
  
      throw err; 
    } finally {
      // Stop loading spinner
      setIsLoading(false);
    }
  };
  
// Login function
const login = async (data) => {
  setIsLoading(true);
  setMessage(null);
  setError(null);

  try {
    const response = await axios.post(`${SERVER_URL}/login`, data, {
      withCredentials: true,
    });

    console.log(response);

    // Handle successful response
    const user = response.data.user;
    const message = response.data.message;

    // Set user and message
    setUser(user);
    setMessage(message);
    setIsAuthenticated(true);

    // Display success toast
    handleToast("Login successful!", "success");

    // Navigate to the home page
    navigate("/");

  } catch (err) {
    console.error(err);
    const errorMessage = err.response?.data?.message || "Login failed";
    setError(errorMessage);

    // Display error toast
    handleToast(errorMessage, "error");

    // Navigate to login page in case of error (you can remove this part if not required)
    navigate("/login");
    
    throw err; // Re-throw error if needed
  } finally {
    setIsLoading(false);
  }
};


// Logout function
const logout = async () => {
  setIsLoading(true);
  setMessage(null);
  setError(null);

  try {
    await axios.post(
      `${SERVER_URL}/logout`,
      {},
      {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );

    // Clear user data and authentication state
    setUser(null);
    setIsAuthenticated(false);

    // Display success toast
    handleToast("Logged out successfully!", "success");

    // Navigate to the login page
    navigate("/login");

  } catch (err) {
    console.error(err);
    const errorMessage = err.response?.data?.message || "Error in Logout";
    setError(errorMessage);

    // Display error toast
    handleToast(errorMessage, "error");

    throw err;
  } finally {
    setIsLoading(false);
  }
};


// Email Verification function
const verifyEmail = async (code) => {
  setIsLoading(true);
  setMessage(null);
  setError(null);

  try {
    const response = await axios.post(
      `${SERVER_URL}/verify-email`,
      { code },
      {
        withCredentials: true,
      }
    );

    // Set user data and authentication status
    setUser(response.data.user);
    setIsAuthenticated(true);

    // Display success toast
    handleToast("Email verified successfully!", "success");

    // Navigate to the create profile page
    navigate("/create-profile");

  } catch (err) {
    console.error(err);
    const errorMessage =
      err.response?.data?.message || "Error in email verification";
    setError(errorMessage);

    // Display error toast
    handleToast(errorMessage, "error");

    throw err;
  } finally {
    setIsLoading(false);
  }
};


// Create user profile
const createProfile = async (formData) => {
  setIsLoading(true);
  setMessage(null);
  setError(null);

  try {
    const response = await axios.post(
      `${SERVER_URL}/create-profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const message = response.data.message;
      setMessage(message);
      handleToast(message, "success"); // Success toast
      navigate("/"); // Navigate to the home page
    } else {
      throw new Error("Unexpected response from the server");
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in creating profile";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast
    console.error("Error creating profile:", err);
  } finally {
    setIsLoading(false);
  }
};


// Edit user profile
const editProfile = async (formData) => {
  setIsLoading(true);
  setMessage(null);
  setError(null);

  try {
    const response = await axios.post(
      `${SERVER_URL}/edit-profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const message = response.data.message;
      setMessage(message);
      handleToast(message, "success"); // Success toast
      navigate("/profile"); // Navigate to the home page
    } else {
      throw new Error("Unexpected response from the server");
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in editing profile";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast
    console.error("Error editing profile:", err);
  } finally {
    setIsLoading(false);
  }
};


  // Check Auth Status function
  const checkAuth = async () => {
    setIsCheckingAuth(true);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/check-auth`, {
        withCredentials: true,
      });

      // Log the response for debugging
      console.log("Check Auth Response:", response);

      // Update user and authentication status based on the response
      if (response.data.user) {
        setUser(response.data.user);
        console.log(response.data.user._id);
        getAllUsers(response.data.user._id);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      // Log error for debugging
      console.error("Check Auth Error:", err);

      // Handle errors
      setUser(null);
      setIsAuthenticated(false);
      setError(
        err.response?.data?.message || "Error checking authentication status"
      );
    } finally {
      setIsCheckingAuth(false);
    }
  };

 // Forgot Password function
const forgotPassword = async (email) => {
  setIsLoading(true);
  setError(null);
  setMessage(null);
  console.log(email);

  try {
    const response = await axios.post(
      `${SERVER_URL}/forgot-password`,
      { email },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    const successMessage = response.data.message || "Reset password email sent successfully";
    setMessage(successMessage);
    handleToast(successMessage, "success"); // Success toast
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in password reset";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast
    console.error(err);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Reset Password function
const resetPassword = async (token, password) => {
  setIsLoading(true);
  setError(null);
  setMessage(null);

  try {
    const response = await axios.post(
      `${SERVER_URL}/reset-password/${token}`, // Ensure URL is correct
      { password },
      { withCredentials: true }
    );

    const successMessage = response.data.message || "Password Reset Successful";
    setMessage(successMessage);
    handleToast(successMessage, "success"); // Success toast

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in password reset";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast

    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Change Password
const changePassword = async (userId, currentPassword, newPassword) => {
  setIsLoading(true);
  setError(null);
  setMessage(null);
  try {
    const response = await axios.post(
      `${SERVER_URL}/change-password`,
      { userId, currentPassword, newPassword },
      { withCredentials: true }
    );
    console.log(response);
    const successMessage = response.data.message || "Password changed successfully";
    setMessage(successMessage);
    handleToast(successMessage, "success"); // Success toast
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in changing password";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast
    throw err;
  } finally {
    setIsLoading(false);
  }
};


// Delete Profile
const deleteProfile = async (password, userId) => {
  setIsLoading(true);
  setError(null);
  setMessage(null);
  try {
    const response = await axios.post(
      `${SERVER_URL}/delete-profile`,
      { password, userId },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    const successMessage = response.data.message || "Profile deleted successfully";
    setMessage(successMessage);
    handleToast(successMessage, "success"); // Success toast
    navigate("/login");
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Error in deleting profile";
    setError(errorMessage);
    handleToast(errorMessage, "error"); // Error toast
    throw err;
  } finally {
    setIsLoading(false);
  }
};


  // Get all users
  const getAllUsers = async (userId) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/get-all-users`, {
        params: { userId }, // Send the userId as a query parameter
        withCredentials: true, // This ensures the cookie is included in the request
      });

      console.log(response);

      const users = response.data.users;
      setUsers(users);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in fetching users";
      setError(errorMessage);
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute checkAuth when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = {
    users,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    error,
    setError,
    isLoading,
    setIsLoading,
    isCheckingAuth,
    setIsCheckingAuth,
    message,
    setMessage,
    register,
    login,
    verifyEmail,
    logout,
    checkAuth,
    forgotPassword,
    resetPassword,
    deleteProfile,
    changePassword,
    createProfile,
    editProfile,
    getAllUsers,
    handleToast
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
