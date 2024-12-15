"use client";
import { resetPassword } from "@/features/auth/servers/resetPasswordAction";
import { useActionState } from "react";

type ResetPasswordFormProps = {
  tokenValue: string;
};

export default function ResetPassowrdForm({
  tokenValue,
}: ResetPasswordFormProps) {
  const [data, action, isPending] = useActionState(resetPassword, undefined);

  return (
    <form action={action}>
      <input type="hidden" name="token" value={tokenValue} />
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Reset Your Password
      </h2>

      <div className="space-y-4">
        {/* New Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            defaultValue={data?.fieldData?.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            className="my-3 mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Repeated Password Input */}
        <div>
          <label
            htmlFor="repeat-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            defaultValue={data?.fieldData?.repeatPassword}
            type="password"
            id="repeat-password"
            name="repeat-password"
            placeholder="Confirm your new password"
            className="my-3 mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <span style={{ color: "red" }}>{data?.error}</span>

      <button
        disabled={isPending}
        type="submit"
        className="w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Reset Password
      </button>
    </form>
  );
}
