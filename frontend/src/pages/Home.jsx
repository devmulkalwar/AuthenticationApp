import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for className merging

// Mock data for registered users
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar1.jpg",
    socialMedia: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    memberSince: "January 2022",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://example.com/avatar2.jpg",
    socialMedia: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
    memberSince: "March 2021",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar: "https://example.com/avatar3.jpg",
    socialMedia: {
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
    },
    memberSince: "August 2020",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Registered Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className={cn("flex flex-col items-center text-center")}>
              <CardHeader>
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4 mb-4">
                  <Button variant="outline" asChild>
                    <a href={user.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={user.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;