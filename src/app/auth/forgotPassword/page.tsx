import { forgotPassword } from "@/actions/auth/forgotPasswordAction";

export default async function ForgotPassword() {
  return (
    <>
      <form
        action={forgotPassword}
        className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Forgot Password?
        </h2>

        <div className="space-y-4">
          {/* New Password Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Error Message (Optional, based on state) */}
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Send
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </form>
    </>
  );
}
