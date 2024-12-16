"use server";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

import prisma from "@/databases/db";

export const register = async (_previousState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      error: `Please fill in the form`,
      fieldData: { name, email, password },
    };
  }

  const matchUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (matchUser?.name === name) {
    return {
      nameError: `${name} already exist!`,
      fieldData: { email, password },
    };
  }

  if (matchUser) {
    return {
      emailError: `${email} already exist!`,
      fieldData: { name, password },
    };
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      name: name,
      slug: name.replace(/\s+/g, "-").toLowerCase(),
      email: email,
      password: hashedPassword,
    },
  });

  return redirect("/auth/login");
};
