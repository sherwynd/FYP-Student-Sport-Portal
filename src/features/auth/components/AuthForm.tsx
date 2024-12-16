import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
}
export default function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="screen-size flex min-h-screen items-center justify-center">
      <section className="auth-form w-full max-w-lg space-y-8 rounded-lg bg-white px-8 py-12 shadow-md">
        <div className="image-auth-form flex justify-center py-4">
          <Image
            src="/ISN_Name_Logo.png"
            width={100}
            height={100}
            alt="ISN Logo"
            className="object-cover"
          />
        </div>
        {children}
      </section>
    </div>
  );
}
