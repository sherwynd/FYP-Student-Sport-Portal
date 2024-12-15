import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthForm from "@/features/auth/components/AuthForm";

export default function Login() {
  return (
    <AuthForm>
      <LoginForm />

      {/* Social Login */}
      <div className="space-y-2">
        <p className="text-center text-sm text-gray-500">Or login with</p>
        <button className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
          <Image
            src="/icons8-google.svg"
            alt="Google"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span>Google</span>
        </button>
      </div>

      {/* Sign Up Link */}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Create new account here{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register now
          </a>
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Forgot your password?{" "}
          <a
            href="/auth/forgotPassword"
            className="text-blue-500 hover:underline"
          >
            press here
          </a>
        </p>
      </div>
    </AuthForm>
  );
}
