"use client";
import { useActionState } from "react";
import { register } from "@/features/auth/servers/registerAction";
import FormField from "@/components/common/FormField";
import { SelectField } from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [data, action, isPending] = useActionState(register, undefined);
  return (
    <form action={action} className="space-y-4">
      {/* Adjusted for vertical spacing */}
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Register Form
      </h2>
      {/* Full Name Input */}
      <div className="space-y-6">
        <FormField
          defaultValue={data?.fieldData?.name}
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your Full Name"
          error={data?.nameError}
        />
        {/* Email Input */}
        <FormField
          defaultValue={data?.fieldData?.email}
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your Email"
          error={data?.emailError}
        />
        {/* Password Input */}
        <FormField
          defaultValue={data?.fieldData?.password}
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          error={data?.passwordError}
        />
        {/* Role Selection */}
        <SelectField
          defaultValue={data?.fieldData?.role}
          label="Role"
          name="role"
          options={[
            { value: "user", label: "Non-Student" },
            { value: "student", label: "Student" },
            { value: "university", label: "University" },
            { value: "organizer", label: "Organizer" },
          ]}
          error={data?.roleError}
        />

        <span style={{ color: "red" }}>{data?.error}</span>

        {/* Register Button */}
        <Button
          disabled={isPending}
          type="submit"
          className="my-4 w-full rounded-md bg-blue-500 py-3 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Register
        </Button>
      </div>
    </form>
  );
}
