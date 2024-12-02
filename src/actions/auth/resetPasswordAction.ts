"use server";

import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

export const resetPassword = async (token: string, formData: FormData) => {
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;

  if (password != repeatPassword) {
    throw new Error("Password not match");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
    userId: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await hash(password, 12);

  // Update the password in the database
  await prisma.user.update({
    where: { id: decoded.userId },
    data: { password: hashedPassword },
  });

  return redirect("/auth/login");
};
