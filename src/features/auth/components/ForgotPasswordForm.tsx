"use client";
import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/features/auth/servers/forgotPasswordAction";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
  const [data, action, isPending] = useActionState(forgotPassword, undefined);

  return (
    <form action={action}>
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Forgot Password?
      </h2>

      <div className="space-y-6">
        {/* Email Input */}
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your Email"
        />
      </div>

      <span style={{ color: "red" }}>{data?.error}</span>
      <span style={{ color: "green" }}>{data?.message}</span>

      <Button
        disabled={isPending}
        type="submit"
        className="my-4 w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Send
      </Button>
    </form>
  );
}
