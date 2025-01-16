import React, { useState, useEffect } from "react";
import { Navbar, NavbarHeader, NavbarMenu, NavbarLinks, NavbarToggle, NavbarLink } from "@/components/ui/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar>
      <NavbarHeader>
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-card-foreground dark:text-white">
              MyLogo
            </Link>
          </div>

          {/* Desktop Menu */}
          <NavbarMenu>
            <NavbarLinks>
              <NavbarLink to="/">Home</NavbarLink>
              <NavbarLink to="/about">About</NavbarLink>
              <NavbarLink to="/services">Services</NavbarLink>
              <NavbarLink to="/contact">Contact</NavbarLink>
            </NavbarLinks>
          </NavbarMenu>

          {/* Mobile Menu Toggle Button */}
          <NavbarToggle>
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
        </div>
      </NavbarHeader>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card dark:bg-card-foreground border-b border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/about">About</NavbarLink>
            <NavbarLink to="/services">Services</NavbarLink>
            <NavbarLink to="/contact">Contact</NavbarLink>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
