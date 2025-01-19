import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarHeader,
  NavbarMenu,
  NavbarLinks,
  NavbarToggle,
  NavbarLink,
  ProfileAvatar,
  AuthButtons,
} from "@/components/ui/Navbar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import defaultProfile from  "../assets/defaultAvtar.png";

const Header = () => {
  const { isAuthenticated, logout, user } = useGlobalContext(); // Replace with your authentication logic
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);
 
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar>
      <NavbarHeader>
        <div className="flex justify-between h-16 items-center">
          {/* Mobile Menu Toggle Button (Left side on small devices) */}
          <NavbarToggle className="md:hidden order-1">
            <button onClick={toggleMenu}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </NavbarToggle>

          {/* Logo (Center on small devices, left on larger devices) */}
          <div className="flex items-center order-2 md:order-1">
            <Link
              to="/"
              className="text-xl font-bold text-card-foreground dark:text-white"
            >
              AuthApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <NavbarMenu className="order-3 hidden md:flex">
            <NavbarLinks>
              <NavbarLink to="/">Home</NavbarLink>
              <NavbarLink to={`/profile/${currentUser?._id || ""}`}>
                Profile
              </NavbarLink>
              <NavbarLink to="/contact">Contact</NavbarLink>
            </NavbarLinks>

            {/* Auth Buttons (Third item from the right) */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <AuthButtons />
              </div>
            ) : (
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            )}

            {/* Theme Toggle (Beside the avatar) */}
            <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Profile Avatar (Rightmost side) */}
            <ProfileAvatar
              src={currentUser?.profilePicture || defaultProfile} // Use optional chaining for safety
              alt="Profile"
            />
          </NavbarMenu>

          {/* Mobile Navbar (Right side on small devices) */}
          <div className="flex items-center space-x-4 md:hidden order-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Profile Avatar */}
            <ProfileAvatar
              src={currentUser?.profilePicture || "https://via.placeholder.com/150"} // Use optional chaining for safety
              alt="Profile"
            />
          </div>
        </div>
      </NavbarHeader>

      {/* Mobile Menu (Vertical List) */}
      {isOpen && (
        <div className="md:hidden bg-card ">
          <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
            <NavbarLink to="/" className="block">
              Home
            </NavbarLink>
            <NavbarLink to={`/profile/${currentUser?._id || ""}`} className="block">
              Profile
            </NavbarLink>
            <NavbarLink to="/contact" className="block">
              Contact
            </NavbarLink>
            {!isAuthenticated ? (
              <div className="pt-4">
                <AuthButtons />
              </div>
            ) : (
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
