"use client";
import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { login } from "@/features/auth/servers/loginAction";
import { useActionState } from "react";

export default function LoginForm() {
  const [data, action, isPending] = useActionState(login, undefined);

  return (
    <form action={action}>
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Login Form
      </h2>

      <div className="space-y-6">
        {/* Email Input */}
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your Email"
          error={data?.emailError}
          defaultValue={data?.fieldData?.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          error={data?.passwordError}
          defaultValue={data?.fieldData?.password}
        />

        <span style={{ color: "red" }}>{data?.error}</span>

        <Button
          disabled={isPending}
          type="submit"
          className="my-4 w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
