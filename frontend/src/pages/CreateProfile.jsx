import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { FaSpinner } from "react-icons/fa"; // Spinner icon from react-icons
import defaultProfile from "../assets/defaultAvtar.png";
import { Navigate } from "react-router-dom";
const CreateProfile = () => {
  const { createProfile, user, isAuthenticated, handleToast } =
    useGlobalContext();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [instagram, setInstagram] = useState(""); // Empty initial value
  const [twitter, setTwitter] = useState(""); // Empty initial value
  const [github, setGithub] = useState(""); // Empty initial value
  const [linkedin, setLinkedin] = useState(""); // Empty initial value
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submitting state

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("fullName", name);
    formData.append("bio", bio);
    formData.append("socialMedia[github]", github);
    formData.append("socialMedia[instagram]", instagram);
    formData.append("socialMedia[linkedin]", linkedin);
    formData.append("socialMedia[twitter]", twitter);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await createProfile(formData);
      // Display success toast
    } catch (error) {
      console.log(error); // Display error toast
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); // Store the file itself
    }
  };

const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser.isProfileComplete) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Create Profile</CardTitle>
            <CardDescription className="text-center">
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
                role="alert"
              >
                <p className="font-bold">
                  Please complete your profile to access the website.
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 border-2 border-red-500 rounded-full overflow-hidden">
                  <img
                    src={
                      profilePicture
                        ? URL.createObjectURL(profilePicture)
                        : defaultProfile
                    }
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profile-picture"
                />
                <label
                  htmlFor="profile-picture"
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Upload Profile Picture
                </label>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Bio
                </label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="Enter your bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium mb-1"
                  >
                    Instagram
                  </label>
                  <Input
                    id="instagram"
                    type="text"
                    placeholder="https://www.instagram.com/yourusername/"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium mb-1"
                  >
                    Twitter
                  </label>
                  <Input
                    id="twitter"
                    type="text"
                    placeholder="https://x.com/yourusername"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium mb-1"
                  >
                    GitHub
                  </label>
                  <Input
                    id="github"
                    type="text"
                    placeholder="https://github.com/yourusername"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium mb-1"
                  >
                    LinkedIn
                  </label>
                  <Input
                    id="linkedin"
                    type="text"
                    placeholder="https://www.linkedin.com/in/yourusername/"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin h-5 w-5 text-white" />
                    <span className="ml-2">Creating Profile...</span>
                  </div>
                ) : (
                  "Create Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;
