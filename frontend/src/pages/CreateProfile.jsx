import React, { useState } from "react";
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

const CreateProfile = () => {
  const { createProfile, user } = useGlobalContext();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Use null initially
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const socialMedia = {
      instagram: instagram,
      twitter: twitter,
      github: github,
      linkedin: linkedin,
    };
    // Create FormData object
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("fullName", name);
    formData.append("bio", bio);

    formData.append("socialMedia[github]", github);
    formData.append("socialMedia[instagram]", instagram);
    formData.append("socialMedia[linkedin]", linkedin);
    formData.append("socialMedia[twitter]", twitter);

    // Append the profile picture to formData if available
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await createProfile(formData);
      setMessage("Profile created successfully!");
    } catch (error) {
      setMessage("Error occurred while creating profile.");
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(file); // Store the file itself
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        {/* Edit Profile Section */}
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Edit Profile</CardTitle>
            <CardDescription className="text-center">
              Update your profile information and social media links.
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
                        : "https://via.placeholder.com/150"
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
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Bio */}
              <Input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              {/* Social Media Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Twitter URL"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="GitHub URL"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Profile
              </Button>
            </form>

            {/* Success/Error Message */}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;
