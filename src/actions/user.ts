"use server";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

import prisma from "@/databases/db";
// import { signIn } from "@/auth";
// import { CredentialsSignin } from "next-auth";

export const register = async (formData: FormData) => {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!fullName || !email || !password) {
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
      fullName: fullName,
      slug: fullName.replace(/\s+/g, "-").toLowerCase(),
      email: email,
      password: hashedPassword,
    },
  });

  redirect("/login");
};

// export const login = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   try {
//     // await signIn("credentials", {
//     //   redirect: false,
//     //   callbackUrl: "/",
//     //   email,
//     //   password,
//     // });
//   } catch (error) {
//     // const errorMessage = error as CredentialsSignin;
//     // return errorMessage.cause;
//   }
//   redirect("/");
// };

// export const google = async () => {
//   await signIn("google");
// };
