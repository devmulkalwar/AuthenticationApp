import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";

const DeleteProfileModal = ({
  setShowDeleteModal,
  handleDeleteProfile,
  isDeleting,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeleteProfile(password);
  };

  return (
    <div className="fixed inset-0 bg-background/90 flex justify-center items-center p-6">
      <div className="bg-card flex flex-col items-center justify-center p-6 rounded-md shadow-md w-80 border border-muted">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Confirm Deletion
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please enter your password to confirm profile deletion.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            type="password"
            className="mb-4"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-around w-full space-x-4">
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="default"
              type="button" // Prevent form submission
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isDeleting} // Disable button while loading
            >
              {isDeleting ? ( // Show spinner when loading
                 <div className="flex items-center justify-center">
                 <FaSpinner className="animate-spin h-5 w-5 text-white" />
                 <span className="ml-2">Deleting...</span>
               </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteProfileModal;