import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { cn } from "@/lib/utils"; // Utility for className merging

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual logic (e.g., API call to reset password)
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setMessage("Your password has been reset successfully!");
      } else {
        setMessage("Passwords do not match. Please try again.");
      }
    } else {
      setMessage("Please fill in both fields.");
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
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;