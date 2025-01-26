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

export function LoginForm({ className, ...props }) {
  const { login } = useGlobalContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(""); // Add error state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Reset error message
    setError("");

    // Set loading to true
    setLoading(true);

    try {
      // Access form data
      const formData = new FormData(formRef.current);

      // Convert form data to a plain object
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      await login(data);
    } catch (err) {
      console.error(err);
    } finally {
      // Stop loading spinner
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin h-5 w-5 text-white" />
                    <span className="ml-2">Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
