"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import prisma from "@/databases/db";
import { createSession } from "@/libs/session";

export const login = async (_previousState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!email && !password) {
    return { error: `Please fill in the form` };
  }

  if (!user) {
    return { emailError: `User not found: ${email}`, fieldData: { email } };
  }

  const passwordValid = await compare(
    password as string,
    user.password as string,
  );

  if (!passwordValid) {
    return { passwordError: `Incorrect password`, fieldData: { email } };
  }

  await createSession(user.id, user.role, user.slug);
  return redirect("/");
};

export const google = async () => {};
