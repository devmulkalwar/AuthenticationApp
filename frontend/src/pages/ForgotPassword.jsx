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
import { FaSpinner } from "react-icons/fa"; // Import spinner icon from react-icons

const ForgotPassword = () => {
  const { forgotPassword, handleToast, user, setMessage } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for better UX
 
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      handleToast("Please enter your email", "error");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      await forgotPassword(email); // Call the forgotPassword function
    } catch (error) {
     console.log(error); //
    } finally {
      setLoading(false); // Reset loading state
    }
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
                {loading ? ( // Show spinner when loading
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;