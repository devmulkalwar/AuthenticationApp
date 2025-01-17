import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for className merging
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"; // Social media icons

// Fake profile data
const profile = {
  id: 1,
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  avatar: "https://avatars.githubusercontent.com/u/116152141?v=4", // Use a valid URL
  bio: "A passionate developer who loves building amazing web applications.",
  socialMedia: {
    twitter: "https://twitter.com/alicejohnson",
    linkedin: "https://linkedin.com/in/alicejohnson",
    github: "https://github.com/alicejohnson",
    instagram: "https://instagram.com/alicejohnson",
  },
  memberSince: "August 2020",
};

const Home = () => {
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={cn("flex flex-col items-center text-center")}>
            <CardHeader className={cn("flex flex-col items-center")}>
              {/* Profile Picture */}
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              {/* Email */}
              <p className="text-sm text-gray-600">{profile.email}</p>
              {/* Bio */}
              <p className="text-sm text-gray-700 mt-2">{profile.bio}</p>
            </CardHeader>
            <CardContent>
              {/* Social Media Links */}
              <div className="flex justify-center space-x-4 mb-4">
                {profile.socialMedia.twitter && (
                  <a
                    href={profile.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                )}
                {profile.socialMedia.linkedin && (
                  <a
                    href={profile.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                )}
                {profile.socialMedia.github && (
                  <a
                    href={profile.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                )}
                {profile.socialMedia.instagram && (
                  <a
                    href={profile.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                )}
              </div>
              {/* Member Since */}
              <p className="text-sm text-gray-500">Member since {profile.memberSince}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;