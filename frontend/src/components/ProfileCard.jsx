import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { format } from "date-fns"; // Import date-fns for date formatting
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProfileCard = ({
  profilePicture,
  name,
  email,
  bio,
  socialMedia,
  createdAt,
  _id
}) => {
  // Format the date
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMMM yyyy")
    : "Unknown";

  return (
    <Card className={cn("flex flex-col items-center text-center")}>
      <CardHeader className={cn("flex flex-col items-center")}>
        {/* Profile Picture */}
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt={name || "Profile Picture"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-xl font-semibold">{name}</h2>
        {/* Email */}
        <p className="text-sm text-gray-600">{email}</p>
        {/* Bio */}
        <p className="text-sm text-gray-700 mt-2">{bio}</p>
      </CardHeader>
      <CardContent>
        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          {socialMedia?.twitter && (
            <a
              href={socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          )}
          {socialMedia?.linkedin && (
            <a
              href={socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          )}
          {socialMedia?.github && (
            <a
              href={socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          )}
          {socialMedia?.instagram && (
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          )}
        </div>
        {/* Member Since */}
        <p className="text-sm text-gray-500">Member since {formattedDate}</p>
        {/* Profile Button */}
       
          <div className="mt-4">
            <Link
              to={`/profile/${_id || ""}`}
            >
              <Button varient="primary">

              View Profile
              </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
