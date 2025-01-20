import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { users, user,isAuthenticated } = useGlobalContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (users) {
      setUsersArray(users);
    }
  }, [users]);

  useEffect(() => {
    const filtered = usersArray.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });

    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortOrder === "newest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });

    setFilteredUsers(sorted);
  }, [usersArray, searchQuery, sortOrder]);


  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && !storedUser.isProfileComplete) {
    return <Navigate to="/create-profile" replace />;
  }
  
  if (!users) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <FaSpinner className="animate-spin h-6 w-6 text-muted-foreground" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-4 md:p-6">
        <p>No users found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col w-full items-center justify-center p-4 md:p-6 lg:p-8 min-h-screen">
      {/* Page Heading */}
      <div className="sticky top-0 text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">User Profiles</h1>
        <p className="text-sm md:text-base">
          Browse and discover user profiles.
        </p>
      </div>

      {/* Search and Sort Section */}
      <div className="w-full max-w-4xl mb-6 md:mb-8 flex flex-col sm:flex-row items-center gap-4 p-4 md:p-6 ">
        {/* Search Bar */}
        <div className="relative w-full md:flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-auto">
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              {sortOrder === "newest" ? "Newest Profiles" : "Oldest Profiles"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Profiles</SelectItem>
              <SelectItem value="oldest">Oldest Profiles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Profiles Grid */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className=" flex justify-center items-center transform transition-transform duration-300 hover:scale-105"
              >
                <ProfileCard {...user} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No users match your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
