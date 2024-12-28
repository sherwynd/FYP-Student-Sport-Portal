import GoogleButton from "@/features/auth/components/GoogleButton";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthForm from "@/features/auth/components/AuthForm";

export default function Login() {
  return (
    <AuthForm>
      <LoginForm />

      {/* Social Login */}
      <div className="space-y-4">
        <p className="mb-6 text-center text-sm text-gray-500">Or Login with</p>
        <GoogleButton />
      </div>

      {/* Sign Up Link */}

      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-600">
            Create new account here{" "}
            <a href="/auth/register" className="text-blue-500 hover:underline">
              Register now
            </a>
          </p>
        </div>

        <div className="my-1 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <a
              href="/auth/forgotPassword"
              className="text-blue-500 hover:underline"
            >
              Press here
            </a>
          </p>
        </div>
      </section>
    </AuthForm>
  );
}
