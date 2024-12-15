import Image from "next/image";
import RegisterFrom from "@/features/auth/components/RegisterForm";

export default async function Register() {
  return (
    <div className="screen-size flex min-h-screen items-center justify-center">
      <section className="register-form w-full max-w-lg space-y-6 rounded-lg bg-white px-4 py-8 shadow-md">
        <div className="image-login-form flex justify-center">
          <Image
            src="/ISN_Name_Logo.png"
            width={200}
            height={200}
            alt="ISN Logo"
            className="flex justify-center object-cover"
          />
        </div>
        <RegisterFrom />

        {/* Social Register */}
        <div className="space-y-2">
          <p className="text-center text-sm text-gray-500">Or Register with</p>
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

        <div className="text-center">
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
    </div>
  );
}
