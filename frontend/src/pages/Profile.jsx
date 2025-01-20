import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaShare,
} from "react-icons/fa";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import DeleteProfileModal from "@/components/DeleteProfileModal"; // Import DeleteProfileModal
import ChangePasswordModal from "@/components/ChangePasswordModal"; // Import ChangePasswordModal

const Profile = () => {
  const {
    user,
    deleteProfile,
    changePassword,
    handleToast,
    setErrorMessage,
    users,
  } = useGlobalContext();
  const { id } = useParams(); // Get user ID from URL params
  const [currentUser, setCurrentUser] = useState(null);
  const [usersArray, setUsersArray] = useState([]);
  const [owner, setOwner] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Effect to set the logged-in user
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  // Effect to set the users array
  useEffect(() => {
    if (users) {
      setUsersArray(users);
    }
  }, [users]);

  // Effect to find the profile for the viewed user by URL parameter
  useEffect(() => {
    if (id) {
      // Combine currentUser and usersArray for searching
      const allUsers = currentUser ? [currentUser, ...usersArray] : usersArray;
      const foundUser = allUsers.find((u) => u._id === id); // Search for user in combined array
      setOwner(foundUser || null); // Set the user's data or null if not found
    }
  }, [id, usersArray, currentUser]);

  // Toggle "no-scroll" class when modals are open
  useEffect(() => {
    document.body.classList.toggle(
      "no-scroll",
      showDeleteModal || showChangePasswordModal
    );
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showDeleteModal, showChangePasswordModal]);

  // Display a message if no user data is found
  if (!owner) {
    return (
      <p className="text-center text-muted-foreground">
        No user information available.
      </p>
    );
  }

  const {
    fullName: name = "Name not provided",
    email = "Email not provided",
    profilePicture = "https://via.placeholder.com/150",
    bio = "No bio available",
    socialMedia = {},
    createdAt,
  } = owner;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  const handleDeleteProfile = async (password) => {
    setIsDeleting(true);
    try {
      await deleteProfile(password, owner._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChangePassword = async (oldPassword, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      handleToast("New passwords do not match.", "error");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(owner._id, oldPassword, newPassword);
      setShowChangePasswordModal(false);
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle sharing the profile
  const handleShareProfile = async () => {
    const profileUrl = window.location.href; // Get the current profile URL
    try {
      await navigator.share({
        title: `${name}'s Profile`,
        text: `Check out ${name}'s profile!`,
        url: profileUrl,
      });
    } catch (error) {
      console.error("Error sharing profile:", error);
      handleToast("Sharing is not supported on this device.", "error");
    }
  };

  // Check if the current profile belongs to the logged-in user
  const isOwner = currentUser?._id === owner?._id;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && !storedUser.isProfileComplete) {
    return <Navigate to="/create-profile" replace />;
  }
  
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-muted">
                <img
                  src={profilePicture}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{name}</h2>
              <p className="text-sm text-center text-muted-foreground">{email}</p>
              <p className="text-sm text-center text-muted-foreground mt-2">{bio}</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="flex justify-center space-x-4 mb-4">
                {socialMedia.twitter && (
                  <a
                    href={socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                )}
                {socialMedia.linkedin && (
                  <a
                    href={socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                )}
                {socialMedia.github && (
                  <a
                    href={socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                )}
                {socialMedia.instagram && (
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
              <p className="text-sm text-muted-foreground mb-4">
                Member since {formattedDate}
              </p>
              {isOwner && (
                <div className="flex justify-center space-x-4 mb-4">
                  <Link to="/edit-profile">
                    <Button variant="default">Edit Profile</Button>
                  </Link>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="destructive"
                  >
                    Delete Profile
                  </Button>
                </div>
              )}
              {isOwner && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowChangePasswordModal(true)}
                    variant="outline"
                  >
                    Change Password
                  </Button>
                </div>
              )}
              {/* Share Profile Button */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleShareProfile}
                  className="flex items-center gap-2"
                >
                  <FaShare className="w-4 h-4" />
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delete Profile Modal */}
          {showDeleteModal && (
            <DeleteProfileModal
              setShowDeleteModal={setShowDeleteModal}
              handleDeleteProfile={handleDeleteProfile}
              isDeleting={isDeleting}
            />
          )}

          {/* Change Password Modal */}
          {showChangePasswordModal && (
            <ChangePasswordModal
              setShowChangePasswordModal={setShowChangePasswordModal}
              handleChangePassword={handleChangePassword}
              isChangingPassword={isChangingPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;