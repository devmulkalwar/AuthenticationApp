import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom"; // To extract URL parameters
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Utility for className merging
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon from react-icons

const ResetPassword = () => {
  const { resetPassword, handleToast } = useGlobalContext();
  const { token } = useParams(); // Extract the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newPassword || !confirmPassword) {
      handleToast("Please enter both password and confirm password", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      handleToast("Passwords do not match", "error");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      await resetPassword(token, newPassword);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your new password and confirm it to reset your password.
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? ( // Show spinner when loading
                  <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin h-5 w-5 text-white" />
                   <span className="ml-2">Reseting Password...</span>
                </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
