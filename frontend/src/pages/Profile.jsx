import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("FileReader result:", reader.result); // Debugging
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected"); // Debugging
    }
  };

  useEffect(() => {
    console.log("Profile Picture Updated:", profilePicture); // Debugging
  }, [profilePicture]);

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
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

              {/* Email */}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Success/Error Message */}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Profile Preview Section */}
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Profile Preview</CardTitle>
            <CardDescription className="text-center">
              This is how your profile will look to others.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {/* Profile Picture */}
            <div className="w-32 h-32 border-2 border-red-500 rounded-full overflow-hidden">
              <img
                src={profilePicture || "https://via.placeholder.com/150"}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold">{name || "Your Name"}</h2>

            {/* Email */}
            <p className="text-sm text-gray-600">{email || "your.email@example.com"}</p>

            {/* Bio */}
            <p className="text-center text-gray-700">{bio || "A short bio about yourself."}</p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://img.icons8.com/fluent/48/000000/instagram-new.png"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://img.icons8.com/fluent/48/000000/twitter.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://img.icons8.com/fluent/48/000000/github.png"
                    alt="GitHub"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://img.icons8.com/fluent/48/000000/linkedin.png"
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;