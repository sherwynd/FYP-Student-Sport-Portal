import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthForm from "@/features/auth/components/AuthForm";
import GoogleButton from "@/features/auth/components/GoogleButton";

export default function Register() {
  return (
    <AuthForm>
      <RegisterForm />

      {/* Social Register */}
      <div className="space-y-2">
        <p className="text-center text-sm text-gray-500">Or Register with</p>
        <GoogleButton />
      </div>

      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-600">
            Already have a account here{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login now
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
      </section>
    </AuthForm>
  );
}
