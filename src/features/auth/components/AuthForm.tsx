import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
}
export default function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="screen-size flex min-h-screen items-center justify-center">
      <section className="login-form w-full max-w-lg space-y-6 rounded-lg bg-white px-4 py-8 shadow-md">
        <div className="image-login-form flex justify-center">
          <Image
            src="/ISN_Name_Logo.png"
            width={200}
            height={200}
            alt="ISN Logo"
            className="flex justify-center object-cover"
          />
        </div>
        {children}
      </section>
    </div>
  );
}
