"use server";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
    });
    redirect("/");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const google = async () => {
  // await signIn("google");
};
