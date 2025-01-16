import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { cn } from "@/lib/utils"; // Utility for className merging

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual logic (e.g., API call to send reset password email)
    if (email) {
      setMessage(`Reset password link has been sent to ${email}.`);
    } else {
      setMessage("Please enter a valid email address.");
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
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("sent") ? "text-green-600" : "text-red-600"
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

export default ForgotPassword;