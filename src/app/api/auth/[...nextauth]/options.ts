import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXTAUTH_GOOGLE_ID ??
        (() => {
          throw new Error("Missing AUTH_GOOGLE_ID");
        })(),
      clientSecret:
        process.env.NEXTAUTH_GOOGLE_SECRET ??
        (() => {
          throw new Error("Missing AUTH_GOOGLE_SECRET");
        })(),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username here",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password here",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          username: "admin",
          password: "adminpassword020627",
        };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
