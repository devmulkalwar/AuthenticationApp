import React, { useState } from "react";
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
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const { forgotPassword, setError, user, setMessage } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return <Navigate to="/" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email address.");
      handleToast("Please enter a valid email address.");
      return;
    }
    forgotPassword(email);
  };

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address to receive a reset password link.
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading} // Disable input while submitting
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Submit"}{" "}
                {/* Button shows loading state */}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
