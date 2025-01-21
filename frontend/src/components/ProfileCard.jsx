import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { format } from "date-fns"; // For date formatting
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import defaultProfile from "../assets/defaultAvtar.png";

const ProfileCard = ({
  profilePicture,
  fullName,
  email,
  socialMedia,
  createdAt,
  _id,
}) => {
  // Format the date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";
  return (
    <Card
    className={cn(
      "flex-grow flex flex-col items-center text-center h-auto w-80", 
      "p-6 shadow-lg rounded-xl border bg-background" // Background and border colors from the theme
    )}
  >
    <CardHeader className="flex flex-col items-center space-y-3">
      {/* Profile Picture */}
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
        <img
          src={profilePicture || defaultProfile}
          alt={fullName || "Profile Picture"}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Name */}
      <h2 className="text-xl font-medium tracking-tight text-foreground">{fullName || "N/A"}</h2>
      {/* Email */}
      <p className="text-sm text-muted-foreground truncate w-full">{email || "N/A"}</p>
    </CardHeader>
    <CardContent className="flex flex-col justify-between flex-grow w-full space-y-4">
      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-2">
        {socialMedia?.twitter && (
          <a
            href={socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-foreground"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
        )}
        {socialMedia?.linkedin && (
          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-foreground"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        )}
        {socialMedia?.github && (
          <a
            href={socialMedia.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-foreground"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        )}
        {socialMedia?.instagram && (
          <a
            href={socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-foreground"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        )}
      </div>
      {/* Member Since */}
      <p className="text-xs italic text-muted-foreground">
        Member since {formattedDate || "N/A"}
      </p>
      {/* Profile Button */}
      <div className="mt-4">
        <Link to={`/profile/${_id || ""}`}>
          <Button className="w-full rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground">
            View Profile
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
  
  
  );
};

export default ProfileCard;
