import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Ensure you have this utility for className merging

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30); // 30-second timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches 0
    }
  }, [timer]);

  const handleVerify = () => {
    // Replace this with your actual verification logic
    if (otp === "123456") {
      setMessage("OTP verified successfully!");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    // Logic to resend OTP (e.g., API call)
    setTimer(30); // Reset timer
    setIsResendDisabled(true); // Disable resend button again
    setMessage("OTP has been resent. Check your inbox.");
  };

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className={cn("flex flex-col items-center justify-center gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Verify OTP</CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit OTP sent to your email/phone.
            </CardDescription>
          </CardHeader>
          <div className=" flex flex-col items-center justify-center gap-4 p-6 pt-0">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button
              
              className="w-2/3 mt-4"
              onClick={handleVerify}
            >
              Verify
            </Button>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            <div className="mt-4 text-center">
              {isResendDisabled ? (
                <p className="text-sm text-gray-600">
                  Resend OTP in {timer} seconds
                </p>
              ) : (
                <Button
                  variant="link"
                  className="text-sm text-blue-600"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                >
                  Resend OTP
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}