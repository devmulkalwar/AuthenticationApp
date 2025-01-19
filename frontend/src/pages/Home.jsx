import React, { useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useGlobalContext } from "@/hooks/useGlobalContext";

const Home = () => {
  const { users , getAllUsers, user} = useGlobalContext(); // Fetch users from context
  
  // Check if users exist and handle loading or error states
  if (!users) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
        <p className="text-gray-600">No users found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user,index) => (
            <ProfileCard key={index} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
