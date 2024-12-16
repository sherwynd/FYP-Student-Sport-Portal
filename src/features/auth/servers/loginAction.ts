"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import prisma from "@/databases/db";
import { createSession } from "@/libs/session";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const login = async (_previousState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !emailRegex.test(email)) {
    return {
      emailError: "Please enter a valid email address",
      fieldData: { email, password },
    };
  }

  if (!password || password.length < 6) {
    return {
      passwordError: "Please enter the password",
      fieldData: { email, password },
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        emailError: `Email not found: ${email}`,
        fieldData: { email, password },
      };
    }

    const passwordValid = await compare(
      password as string,
      user.password as string,
    );

    if (!passwordValid) {
      return {
        passwordError: `Incorrect password`,
        fieldData: { email, password },
      };
    }

    await createSession(user.id, user.role, user.slug);
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }

  return redirect("/");
};
