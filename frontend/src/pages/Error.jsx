import React from "react";
import { Button } from "@/components/ui/button"; // Replace with your button component
import { useNavigate } from "react-router-dom"; // For routing (replace with Next.js router if needed)

const Error = () => {
  const navigate = useNavigate();

  // Function to navigate back to the homepage
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="text-center space-y-6">
        {/* Error Icon */}
        <div className="text-9xl font-bold text-gray-800">404</div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Home Button */}
        <Button
          onClick={handleGoHome}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Go Back Home
        </Button>
      </div>

      {/* Inline SVG Illustration */}
      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 256 256"
          className="w-64 h-64"
        >
          <path
            fill="#6D28D9"
            d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
          />
          <path
            fill="#6D28D9"
            d="M128 72a56 56 0 1 0 56 56a56 56 0 0 0-56-56Zm0 96a40 40 0 1 1 40-40a40 40 0 0 1-40 40Z"
          />
          <path
            fill="#6D28D9"
            d="M128 104a24 24 0 1 0 24 24a24 24 0 0 0-24-24Zm0 32a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Error;