"use server";

import prisma from "@/databases/db";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export const forgotPassword = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: `Please fill in the form`, fieldData: { email } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      emailError: `Email not found: ${email}`,
      fieldData: { email },
    };
  }

  const resetToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1h",
    },
  );

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resetPassword/${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER!,
    to: email,
    subject: "Password Reset",
    html: `
        <h3>Reset your password</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
  });

  return {
    message: "The reset link have sent to your email!",
    fieldData: { email },
  };
};
