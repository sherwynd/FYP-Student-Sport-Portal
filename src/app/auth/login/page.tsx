import { login } from "@/features/auth/servers/loginAction";

export default async function Login() {
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
      <form action={login}>
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Login Form
        </h2>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="my-3 mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message (Optional, based on state) */}
        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </form>

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
    </div>
  );
}
