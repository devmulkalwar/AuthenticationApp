import { RegisterForm } from "@/components/RegistrationForm";
import { Navigate } from "react-router-dom";

export default function Register() {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      return <Navigate to="/" replace />;
    }
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-6">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
