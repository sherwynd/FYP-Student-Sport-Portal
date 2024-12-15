"use client";
import { forgotPassword } from "@/features/auth/servers/forgotPasswordAction";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
  const [data, action, isPending] = useActionState(forgotPassword, undefined);

  return (
    <form action={action}>
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Forgot Password?
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
            className="my-3 mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span style={{ color: "red" }}>{data?.emailError}</span>
      </div>

      <span style={{ color: "red" }}>{data?.error}</span>
      <span style={{ color: "green" }}>{data?.message}</span>

      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Send
      </button>
    </form>
  );
}
