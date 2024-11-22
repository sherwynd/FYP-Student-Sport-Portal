"use server";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (email && password) {
      redirect("/");
    }
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const errorMessage = error as CredentialsSignin;
    return errorMessage.cause;
  }
  redirect("/");
};

export const google = async () => {
  await signIn("google");
};
