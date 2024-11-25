import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/databases/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXTAUTH_GOOGLE_ID ??
        (() => {
          throw new Error("Missing NEXTAUTH_GOOGLE_ID");
        })(),
      clientSecret:
        process.env.NEXTAUTH_GOOGLE_SECRET ??
        (() => {
          throw new Error("Missing NEXTAUTH_GOOGLE_SECRET");
        })(),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email here",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password here",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordValid = await compare(
          credentials.password as string,
          user.password as string,
        );

        if (!passwordValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
