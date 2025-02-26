import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthForm from "@/features/auth/components/AuthForm";
import GoogleButton from "@/features/auth/components/GoogleButton";

export default function Register() {
  return (
    <AuthForm>
      <RegisterForm />

      {/* Social Register */}
      <div className="space-y-4">
        <p className="mb-6 text-center text-sm text-gray-500">
          Or Register with
        </p>
        <GoogleButton />
      </div>

      {/* Login Link */}

      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login now
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
