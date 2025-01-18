import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, deleteUser, navigateToEditProfile } = useGlobalContext(); // Assuming these actions exist in your context
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  if (!currentUser) {
    return <p className="text-center text-gray-600">No user information available.</p>;
  }

  const {
    fullName: name,
    email,
    profilePicture,
    bio,
    socialMedia,
    createdAt,
  } = currentUser;

  // Format the date for "Member since" display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handler for the Edit button


  // Handler for the Delete button
  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteUser(user._id); // Replace with your delete profile logic
        alert("Profile deleted successfully.");
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Failed to delete profile.");
      }
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 ">
    <Card className="flex flex-col items-center text-center p-6 space-y-6">
      <CardHeader className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt={name || "Profile Picture"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-xl font-semibold">{name || "Name not provided"}</h2>
        {/* Email */}
        <p className="text-sm text-gray-600">{email || "Email not provided"}</p>
        {/* Bio */}
        <p className="text-sm text-gray-700 mt-2">{bio || "No bio available"}</p>
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
        <p className="text-sm text-gray-500 mb-4">
          Member since {createdAt ? formattedDate : "Unknown date"}
        </p>
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link to="/edit-profile">
          <Button  className="bg-blue-500 text-white hover:bg-blue-600">
            Edit Profile
          </Button>
          </Link>
          <Button
            onClick={handleDeleteProfile}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default Profile;
