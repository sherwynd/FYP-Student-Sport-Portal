"use server";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

import prisma from "@/databases/db";

enum Role {
  Admin = "admin",
  User = "user",
  Student = "student",
  University = "university",
  Industry = "industry",
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (_previousState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  if (!name || name.trim() === "") {
    return {
      nameError: "Name is required",
      fieldData: { name, email, password, role },
    };
  }
  if (!email || !emailRegex.test(email)) {
    return {
      emailError: "Please enter a valid email address",
      fieldData: { name, email, password, role },
    };
  }
  if (!password || password.length < 6) {
    return {
      passwordError: "Password must be at least 6 characters long",
      fieldData: { name, email, password, role },
    };
  }
  if (!role) {
    return {
      roleError: "Role selection is required",
      fieldData: { name, email, password, role },
    };
  }

  try {
    const matchUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (matchUser?.name === name) {
      return {
        nameError: `${name} already exist!`,
        fieldData: { email, password, role },
      };
    }

    if (matchUser) {
      return {
        emailError: `${email} already exist!`,
        fieldData: { name, email, password, role },
      };
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name: name,
        slug: name.replace(/\s+/g, "-").toLowerCase(),
        email: email,
        role: role,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    // Handle unexpected errors
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }

  return redirect("/auth/login");
};
