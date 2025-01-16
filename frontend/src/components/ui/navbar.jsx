import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have the cn utility to merge classes
import { Link } from "react-router-dom";

// Navbar Component
const Navbar = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
));
Navbar.displayName = "Navbar";

// Navbar Header
const NavbarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    {...props}
  />
));
NavbarHeader.displayName = "NavbarHeader";

// Navbar Menu (for Desktop)
const NavbarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("hidden md:flex space-x-8 items-center", className)}
    {...props}
  />
));
NavbarMenu.displayName = "NavbarMenu";

// Navbar Links
const NavbarLinks = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex space-x-8 items-center", className)}
    {...props}
  />
));
NavbarLinks.displayName = "NavbarLinks";

// Navbar Toggle Button for Mobile
const NavbarToggle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center md:hidden", className)}
    {...props}
  />
));
NavbarToggle.displayName = "NavbarToggle";

// Navbar Link Component
const NavbarLink = React.forwardRef(({ to, children, className, ...props }, ref) => (
  <Link
    to={to}
    ref={ref}
    className={cn(
      "text-card-foreground hover:text-card-foreground-dark transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </Link>
));
NavbarLink.displayName = "NavbarLink";

export {
  Navbar,
  NavbarHeader,
  NavbarMenu,
  NavbarLinks,
  NavbarToggle,
  NavbarLink,
};
