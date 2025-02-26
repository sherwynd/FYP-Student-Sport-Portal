import AuthForm from "@/features/auth/components/AuthForm";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
export default function ForgotPassword() {
  return (
    <AuthForm>
      <ForgotPasswordForm />

      {/* Login Link */}

      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </AuthForm>
  );
}
