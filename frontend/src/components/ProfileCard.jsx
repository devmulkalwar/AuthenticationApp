import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { format } from "date-fns"; // For date formatting
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProfileCard = ({
  profilePicture,
  name,
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
        "flex flex-col items-center text-center h-auto w-64", // Removed fixed height
        "p-4 shadow-md rounded-lg border"
      )}
    >
      <CardHeader className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt={name || "Profile Picture"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-lg font-semibold truncate w-full">{name}</h2>
        {/* Email */}
        <p className="text-xs text-gray-600 truncate w-full">{email}</p>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow w-full">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-4">
          {socialMedia?.twitter && (
            <a
              href={socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {socialMedia?.linkedin && (
            <a
              href={socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {socialMedia?.github && (
            <a
              href={socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {socialMedia?.instagram && (
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          )}
        </div>
        {/* Member Since */}
        <p className="text-xs text-gray-500 mt-4">Member since {formattedDate}</p>
        {/* Profile Button */}
        <div className="mt-4">
          <Link to={`/profile/${_id || ""}`}>
            <Button className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
