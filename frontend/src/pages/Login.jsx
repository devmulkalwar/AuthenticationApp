import { LoginForm } from "@/components/LoginForm"

export default function Login() {
  return (
    <div className="flex flex-grow w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
