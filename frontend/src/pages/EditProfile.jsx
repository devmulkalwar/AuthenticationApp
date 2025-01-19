import React, { useState, useEffect } from "react";
import axios from "axios";  // assuming you're using axios for API requests
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const EditProfile = () => {
  const { user, editProfile,handleToast } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Track the initial values for comparison
  const [initialValues, setInitialValues] = useState({});

  // Function to compare current state with initial values
  const hasChanges = () => {
    return (
      name !== initialValues.name ||
      email !== initialValues.email ||
      bio !== initialValues.bio ||
      instagram !== initialValues.instagram ||
      twitter !== initialValues.twitter ||
      github !== initialValues.github ||
      linkedin !== initialValues.linkedin ||
      profilePicture !== initialValues.profilePicture
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      handleToast("No changes detected.", "info"); // Use info toast for no changes
      return; // Don't submit if there are no changes
    }

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

      await editProfile(formData);
   
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    if (user) {
      // Initialize form state and store initial values for comparison
      setName(user.fullName);
      setEmail(user.email);  // Make sure the email is tracked
      setBio(user.bio);
      setProfilePicture(user.profilePicture);
      setInstagram(user.socialMedia.instagram);
      setTwitter(user.socialMedia.twitter);
      setGithub(user.socialMedia.github);
      setLinkedin(user.socialMedia.linkedin);

      // Set initial values for comparison later
      setInitialValues({
        name: user.fullName,
        email: user.email,  // Ensure email is included in the initial values
        bio: user.bio,
        profilePicture: user.profilePicture,
        instagram: user.socialMedia.instagram,
        twitter: user.socialMedia.twitter,
        github: user.socialMedia.github,
        linkedin: user.socialMedia.linkedin
      });
    }
  }, [user]);

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        {/* Edit Profile Section */}
        <Card className="flex flex-col gap-6">
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
                    src={profilePicture || "https://via.placeholder.com/150"}
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
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
