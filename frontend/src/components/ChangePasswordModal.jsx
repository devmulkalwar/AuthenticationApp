import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";

const ChangePasswordModal = ({
  setShowChangePasswordModal,
  handleChangePassword,
  isChangingPassword,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword(oldPassword, newPassword, confirmNewPassword);
  };

  return (
    <div className="fixed inset-0 bg-background/90 flex justify-center items-center p-6">
      <div className="bg-card flex flex-col items-center justify-center p-6 rounded-md shadow-md w-80 border border-muted">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            type="password"
            className="mb-4"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            className="mb-4"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            className="mb-4"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <div className="flex justify-around w-full space-x-4">
            <Button
              onClick={() => setShowChangePasswordModal(false)}
              variant="default"
              type="button" // Prevent form submission
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isChangingPassword} // Disable button while loading
            >
              {isChangingPassword ? ( // Show spinner when loading
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin h-5 w-5 text-white" />
                  <span className="ml-2">Changing Password...</span>
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
