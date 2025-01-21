import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import emailjs from "emailjs-com"; // Import EmailJS SDK
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const { user, handleToast, isAuthenticated } = useGlobalContext(); // Access user data from context
  const form = useRef(); // Create form ref
  const [email, setEmail] = useState(""); // Initialize email state
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setEmail(user.email);
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set loading state to true
    setIsLoading(true);

    // Initialize EmailJS with private key
    emailjs.init(import.meta.env.VITE_EMAIL_PRIVATE_KEY);

    // Send the form data using EmailJS
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        (response) => {
          // Success message handling
          console.log("Email sent successfully", response);
          handleToast("Your message has been sent successfully!", "success");
          setMessage("");
          setSubject("");
          setIsLoading(false); // Reset loading state
        },
        (error) => {
          // Error message handling
          console.error("Error sending email", error);
          handleToast(
            error?.text || "Error sending message. Please try again."
          );
          setIsLoading(false); // Reset loading state
        }
      );
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && !storedUser.isProfileComplete) {
    return <Navigate to="/create-profile" replace />;
  }

  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card className={cn("flex flex-col gap-6")}>
          <CardHeader>
            <CardTitle className="text-center">Contact Us</CardTitle>
            <CardDescription className="text-center">
              Have questions or feedback? We'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <Input
                name="from_name" // Corrected name for EmailJS template
                type="text"
                placeholder="Your Name"
                value={user ? user.fullName : ""}
                readOnly={true} // Set to read-only
                required
              />

              {/* Email */}
              <Input
                name="from_email" // Corrected name for EmailJS template
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={true} // Set to read-only
                required
              />

              {/* Subject */}
              <Input
                name="subject"
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              {/* Message */}
              <Textarea
                name="message"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin h-5 w-5 text-white" />
                    <span className="ml-2">Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
