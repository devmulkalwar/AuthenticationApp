import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import defaultProfile from "../assets/defaultAvtar.png";
const EditProfile = () => {
  const { user, editProfile, handleToast } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [initialValues, setInitialValues] = useState({}); // Store initial values for change detection

  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setEmail(user.email);
      setBio(user.bio);
      setProfilePicture(user.profilePicture);
      setInstagram(user.socialMedia.instagram || "");
      setTwitter(user.socialMedia.twitter || "");
      setGithub(user.socialMedia.github || "");
      setLinkedin(user.socialMedia.linkedin || "");

      setInitialValues({
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        instagram: user.socialMedia.instagram || "",
        twitter: user.socialMedia.twitter || "",
        github: user.socialMedia.github || "",
        linkedin: user.socialMedia.linkedin || "",
      });
    }
  }, [user]);

  const hasChanges = () => {
    return (
      name !== initialValues.fullName ||
      email !== initialValues.email ||
      bio !== initialValues.bio ||
      instagram !== initialValues.instagram ||
      twitter !== initialValues.twitter ||
      github !== initialValues.github ||
      linkedin !== initialValues.linkedin ||
      profilePicture !== initialValues.profilePicture
    );
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      handleToast("No changes detected.", "info");
      return;
    }

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

    setIsSubmitting(true); // Set submitting state
    try {
      await editProfile(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
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
                    src={
                      profilePicture instanceof File
                        ? URL.createObjectURL(profilePicture)
                        : profilePicture || defaultProfile
                    }
                    alt="Profile"
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
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <Input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {/* Social Media Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Instagram
                  </label>
                  <Input
                    type="text"
                    placeholder="Instagram URL"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Twitter
                  </label>
                  <Input
                    type="text"
                    placeholder="Twitter URL"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    GitHub
                  </label>
                  <Input
                    type="text"
                    placeholder="GitHub URL"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    LinkedIn
                  </label>
                  <Input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
