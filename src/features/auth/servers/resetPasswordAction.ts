"use server";

import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

export const resetPassword = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;

  if (password != repeatPassword) {
    return {
      error: `Password not match`,
      fieldData: { password, repeatPassword },
    };
  }

  try {
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
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token has expired");
      return {
        error: `Token has expired, please request again`,
        fieldData: { password, repeatPassword },
      };
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("Token is invalid");
      return {
        error: `Token is invalid, please request again`,
        fieldData: { password, repeatPassword },
      };
    } else {
      console.error("Token Verification error");
      return {
        error: `Token Verification error occur, please request again`,
        fieldData: { password, repeatPassword },
      };
    }
  }

  return redirect("/auth/login");
};
