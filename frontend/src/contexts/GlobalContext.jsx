import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "@/hooks/useGlobalContext";

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;
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

      // Handle successful response
      const user = response.data.user;
      const message = response.data.message;

      // Set user and authentication state
      setUser(user);
      setMessage(message);
      setIsAuthenticated(true);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      handleToast(
        "Registration successful! Please verify your OTP.",
        "success"
      );

      await checkAuth();

      navigate("/verify-otp");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);

      handleToast(errorMessage, "error");

      throw err;
    } finally {
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

      // Handle successful response
      const user = response.data.user;
      const message = response.data.message;

      // Set user and authentication state
      setUser(user);
      setMessage(message);
      setIsAuthenticated(true);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Display success toast
      handleToast("Login successful!", "success");
      await checkAuth();
      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);

      // Display error toast
      handleToast(errorMessage, "error");

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

      // Remove user data from localStorage
      localStorage.removeItem("user");

      // Display success toast
      handleToast("Logged out successfully!", "success");
      await checkAuth();
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
        const profileData = response.data.user; // Assuming the server responds with profile data

        // Get existing user data from localStorage
        const existingUserData = JSON.parse(localStorage.getItem("user")) || {};

        // Merge the new profile data into the existing user data
        const updatedUserData = {
          ...existingUserData,
          ...profileData, // Override with new profile data
        };

        // Store the updated data in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        setMessage(message);
        handleToast(message, "success"); // Display a success toast
        await checkAuth();
        navigate("/"); // Navigate to the home page
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in creating profile";
      setError(errorMessage);
      handleToast(errorMessage, "error"); // Display an error toast
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
        const updatedProfileData = response.data.user; // Assuming the server responds with updated profile data

        // Get existing user data from localStorage
        const existingUserData = JSON.parse(localStorage.getItem("user")) || {};

        // Merge the updated profile data into the existing user data
        const updatedUserData = {
          ...existingUserData,
          ...updatedProfileData, // Override with updated profile data
        };

        // Store the updated data in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        setMessage(message);
        handleToast(message, "success"); // Success toast
        await checkAuth();
        navigate(`/profile/${updatedProfileData._id}`); // Navigate to the profile page
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
      // Check if user data exists in localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        // Parse the user data and update the state
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        getAllUsers();

      } else {
        // If no user data is found in localStorage, make the backend request
        const response = await axios.get(`${SERVER_URL}/check-auth`, {
          withCredentials: true,
        });

        

        // Update user and authentication status based on the response
        if (response.data.user) {
          const user = response.data.user;

          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(user));

          getAllUsers();
  
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
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

    try {
      const response = await axios.post(
        `${SERVER_URL}/forgot-password`,
        { email },
        {
          withCredentials: true,
        }
      );
      const successMessage =
        response.data.message || "Reset password email sent successfully";
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

      const successMessage =
        response.data.message || "Password Reset Successful";
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
      const successMessage =
        response.data.message || "Password changed successfully";
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

      const successMessage =
        response.data.message || "Profile deleted successfully";

      // Clear localStorage
      localStorage.removeItem("user"); // Removes all keys. Alternatively, use localStorage.removeItem('key') for specific keys.

      // Show success toast
      handleToast(successMessage, "success");
      await checkAuth();
      // Navigate to login
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error in deleting profile";

      // Show error toast
      setError(errorMessage);
      handleToast(errorMessage, "error");

      throw err; // Optional: Propagate the error further if needed
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  };

  // Get all users
  const getAllUsers = async () => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/get-all-users`, {
        params: {  }, // Send the userId as a query parameter
        withCredentials: true, // This ensures the cookie is included in the request
      });
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
    handleToast,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
