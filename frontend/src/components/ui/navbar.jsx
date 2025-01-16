import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have the cn utility to merge classes
import { Link } from "react-router-dom";
import { Button } from "./button";

// Navbar Component
const Navbar = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("sticky top-0 border bg-card text-card-foreground shadow", className)}
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
const NavbarLink = React.forwardRef(
  ({ to, children, className, ...props }, ref) => (
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
  )
);
NavbarLink.displayName = "NavbarLink";

// Profile Avatar Component
const ProfileAvatar = React.forwardRef(
  ({ src, alt, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-10 w-10 rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
);
ProfileAvatar.displayName = "ProfileAvatar";

// Login/Register Buttons
const AuthButtons = () => (
  <div className="flex space-x-4">
    <Link to="/login">
      <Button variant="outline">Login</Button>
    </Link>
    <Link to="/register">
      <Button>Register</Button>
    </Link>
  </div>
);

export {
  Navbar,
  NavbarHeader,
  NavbarMenu,
  NavbarLinks,
  NavbarToggle,
  NavbarLink,
  ProfileAvatar,
  AuthButtons,
};
