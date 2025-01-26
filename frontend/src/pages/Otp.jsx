import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Ensure you have this utility for className merging
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon from react-icons

export default function Otp() {
  const { verifyEmail, handleToast } = useGlobalContext();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleVerify = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (otp === "") {
      handleToast("Please enter the OTP", "error");
    } else {
      setIsLoading(true); // Set loading to true
      try {
        await verifyEmail(otp); // Call the verifyEmail function
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isVerified) {
      return <Navigate to="/" replace />;
    }

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
          <div className="flex flex-col items-center justify-center gap-4 p-6 pt-0">
            <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-4">
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
                type="submit" // Set button type to submit
                className="w-2/3 mt-4"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? ( // Show spinner when loading
                   <div className="flex items-center justify-center">
                   <FaSpinner className="animate-spin h-5 w-5 text-white" />
                   <span className="ml-2">Verifying...</span>
                 </div>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}