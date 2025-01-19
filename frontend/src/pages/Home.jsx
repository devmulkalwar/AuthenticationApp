import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaSort } from "react-icons/fa";

const Home = () => {
  const { users, getAllUsers } = useGlobalContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);

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

  if (!users) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
        <p>No users found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center p-6 md:p-10 min-h-screen">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">User Profiles</h1>
        <p>Browse and discover user profiles.</p>
      </div>

      {/* Search and Sort Section */}
      <div className="w-full max-w-4xl mb-8 flex flex-wrap items-center gap-4 p-6 border rounded-md">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Sort by Creation Date Dropdown */}
        <div className="relative">
          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded appearance-none"
          >
            <option value="newest">Newest Profiles</option>
            <option value="oldest">Oldest Profiles</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery("");
            setSortOrder("newest");
          }}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>

      {/* User Profiles Grid */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={index} className="transform transition-transform duration-300">
                <ProfileCard {...user} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No users match your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
