"use client";
import { register } from "@/features/auth/servers/registerAction";
import { useActionState } from "react";
export default function RegisterForm() {
  const [data, action, isPending] = useActionState(register, undefined);
  return (
    <form action={action}>
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Register Form
      </h2>

      <div className="space-y-6">
        {/* Full Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            defaultValue={data?.fieldData?.name}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span style={{ color: "red" }}>{data?.nameError}</span>
        </div>

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
        <span style={{ color: "red" }}>{data?.emailError}</span>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            defaultValue={data?.fieldData?.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <span style={{ color: "red" }}>{data?.error}</span>

        <button
          disabled={isPending}
          type="submit"
          className="my-4 w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Register
        </button>
      </div>
    </form>
  );
}
