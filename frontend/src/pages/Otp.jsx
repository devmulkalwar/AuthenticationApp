import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Ensure you have this utility for className merging
import { useGlobalContext } from "@/hooks/useGlobalContext";

export default function Otp() {
  const { verifyEmail,handleToast } = useGlobalContext();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = () => {
    if (otp === "") {
      handleToast("Please enter the OTP", "error");
    } else {
      verifyEmail(otp);
    }
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
          <div className="flex flex-col items-center justify-center gap-4 p-6 pt-0">
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
            <Button className="w-2/3 mt-4" onClick={handleVerify}>
              Verify
            </Button> 
          </div>
        </Card>
      </div>
    </div>
  );
}
