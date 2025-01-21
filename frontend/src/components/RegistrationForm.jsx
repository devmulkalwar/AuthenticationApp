import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRef, useState } from "react"; // Import useState
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { FaSpinner } from "react-icons/fa";

export function RegisterForm({ className, ...props }) {
  const { register, handleToast } = useGlobalContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Set loading to true
    setLoading(true);

    // Access form data
    const formData = new FormData(formRef.current);

    // Convert form data to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      handleToast("Passwords do not match", "error");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      // Simulate a delay (replace this with your actual registration API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call the register function with the form data
      await register(data);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Fill in your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin h-5 w-5 text-white" />
                    <span className="ml-2">Registering...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
