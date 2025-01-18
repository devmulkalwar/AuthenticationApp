import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // For consistent ShadCN styling
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, deleteProfile, changePassword , handleToast, setError , errorMessage} = useGlobalContext(); // Assuming these actions exist in your context
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  if (!currentUser) {
    return (
      <p className="text-center text-muted-foreground">
        No user information available.
      </p>
    );
  }

  const {
    fullName: name,
    email,
    profilePicture,
    bio,
    socialMedia,
    createdAt,
  } = currentUser;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile(password, user._id);
      alert("Profile deleted successfully.");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please ensure your password is correct.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      errorMessage = "New passwords do not match.";
      setError(errorMessage);
      handleToast(errorMessage, "error");
      return;
    }

    try {
      await changePassword(user._id, oldPassword, newPassword);
      alert("Password changed successfully.");
      setShowChangePasswordModal(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please check your old password.");
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <Card className="flex flex-col items-center text-center p-6 space-y-6 shadow-md border">
        <CardHeader className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-muted">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt={name || "Profile Picture"}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {name || "Name not provided"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {email || "Email not provided"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {bio || "No bio available"}
          </p>
        </CardHeader>
        <CardContent>
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
                className="text-muted-foreground hover:text-foreground"
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
          <p className="text-sm text-muted-foreground mb-4">
            Member since {createdAt ? formattedDate : "Unknown date"}
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/edit-profile">
              <Button variant="default">Edit Profile</Button>
            </Link>
            <Button
              onClick={() => setShowChangePasswordModal(true)}
              variant="secondary"
            >
              Change Password
            </Button>
            <Button onClick={() => setShowDeleteModal(true)} variant="destructive">
              Delete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-background/90 flex justify-center items-center">
          <div className="bg-card p-6 rounded-md shadow-md w-80 border border-muted">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Confirm Deletion
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter your password to confirm profile deletion.
            </p>
            <Input
              type="password"
              className="mb-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setShowDeleteModal(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleDeleteProfile} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-background/90 flex justify-center items-center">
          <div className="bg-card p-6 rounded-md shadow-md w-80 border border-muted">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Change Password
            </h3>
            <Input
              type="password"
              className="mb-4"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              type="password"
              className="mb-4"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              className="mb-4"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setShowChangePasswordModal(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleChangePassword} variant="primary">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
