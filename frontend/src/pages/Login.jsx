import { LoginForm } from "@/components/LoginForm"
import { Navigate } from "react-router-dom";

export default function Login() {
  const storedUser = localStorage.getItem("user");
  if(storedUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
