"use server";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

import prisma from "@/databases/db";

export const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Please fill every required field");
  }

  const matchEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (matchEmail) throw new Error("Email already exists");

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      name: name,
      slug: name.replace(/\s+/g, "-").toLowerCase(),
      email: email,
      password: hashedPassword,
    },
  });

  redirect("/login");
};
