import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import emailjs from "emailjs-com"; // Import EmailJS SDK

const Contact = () => {
  
  const form = useRef(); // Create form ref
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

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
          setSubmissionStatus("Your message has been sent successfully!");
          setIsLoading(false); // Reset loading state
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          // Error message handling
          console.error("Error sending email", error);
          setSubmissionStatus(error?.text || "Error sending message. Please try again.");
          setIsLoading(false); // Reset loading state
        }
      );
  };

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
                name="from_name"  // Corrected name for EmailJS template
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Email */}
              <Input
                name="from_email"  // Corrected name for EmailJS template
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Subject */}
              <Input
                name="subject"  // Corrected name for EmailJS template
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              {/* Message */}
              <Textarea
                name="message"  // Corrected name for EmailJS template
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Submission Status Message */}
            {submissionStatus && (
              <p
                className={`mt-4 text-center ${
                  submissionStatus.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submissionStatus}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
