"use client";
import { login } from "@/features/auth/servers/loginAction";
import { useActionState } from "react";

export default function LoginFrom() {
  const [data, action, isPending] = useActionState(login, undefined);

  return (
    <form action={action}>
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
            defaultValue={data?.fieldData?.email}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your Email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {data?.emailError && (
          <span style={{ color: "red" }}>{data?.emailError}</span>
        )}
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
          className="my-3 mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {data?.passwordError && (
        <span style={{ color: "red" }}>{data?.passwordError}</span>
      )}

      {isPending && <p>Loading...</p>}
      {data?.error && <span style={{ color: "red" }}>{data?.error}</span>}
      {/* {data?.message && <span style={{ color: "green" }}>{data?.message}</span>} */}
      {/* Error Message (Optional, based on state) */}
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Login
      </button>
    </form>
  );
}
