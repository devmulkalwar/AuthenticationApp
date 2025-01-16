import { RegisterForm } from "@/components/RegistrationForm";

export default function Register() {
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-6">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
