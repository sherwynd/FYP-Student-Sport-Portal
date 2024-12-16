"use client";
import { useActionState } from "react";
import { register } from "@/features/auth/servers/registerAction";

export default function RegisterForm() {
  const [data, action, isPending] = useActionState(register, undefined);
  return (
    <form action={action} className="space-y-4">
      {/* Adjusted for vertical spacing */}
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Register Form
      </h2>
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
          placeholder="Enter your full name" // Adjusted placeholder
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          placeholder="Enter your email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span style={{ color: "red" }}>{data?.emailError}</span>
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
          defaultValue={data?.fieldData?.password}
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span style={{ color: "red" }}>{data?.passwordError}</span>
      </div>
      {/* Role Selection */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Select your role
        </label>
        <select
          defaultValue={data?.fieldData?.role}
          id="role"
          name="role"
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            -- Please choose an option --
          </option>
          <option value="user">Non-Student</option>
          <option value="student">Student</option>
          <option value="university">University</option>
          <option value="organizer">Organizer</option>
        </select>
        <span style={{ color: "red" }}>{data?.roleError}</span>
      </div>
      {/* Error Message */}
      <span style={{ color: "red" }}>{data?.error}</span>
      {/* Register Button */}
      <button
        disabled={isPending}
        type="submit"
        className="mt-6 h-[80px] w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Register
      </button>
    </form>
  );
}
