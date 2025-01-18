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
import { useRef } from "react"; // Import useRef to access form data
import { useGlobalContext } from "@/hooks/useGlobalContext";
export function RegisterForm({ className, ...props }) {
  const {register} = useGlobalContext();
  const formRef = useRef(null);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Access form data
    const formData = new FormData(formRef.current);

    // Convert form data to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Log the form data to the console
    console.log("Form Data:", data);
    if(data.password !== data.confirmPassword){
      return alert("Passwords do not match");
    } else {
      register(data);
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
          {/* Attach the ref and onSubmit handler to the form */}
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email" // Add a name attribute to identify the field
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password" 
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm-password"
                  name="confirmPassword" // Add a name attribute to identify the field
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
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