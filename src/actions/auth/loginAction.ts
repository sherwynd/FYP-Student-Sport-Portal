"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import prisma from "@/databases/db";
import { createSession } from "@/libs/session";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error(`User ${email} not found`);
  }

  const passwordValid = await compare(
    password as string,
    user.password as string,
  );

  if (!passwordValid) {
    throw new Error(`Password is invalid`);
  }

  await createSession(user.id, user.role, user.slug);
  return redirect("/");
};

export const google = async () => {};
