import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";

import prisma from "@/databases/db";
import { DefaultJWT } from "next-auth/jwt";

interface IUser extends DefaultSession {
  id: string;
  email: string;
  fullName: string;
  slug: string;
  refId: string;
  activeStatus: string;
  role: string;
  image?: string;
  authProviderId?: string;
}

interface IToken extends DefaultJWT {
  id: string;
  email: string;
  fullName: string;
  slug: string;
  refId: string;
  activeStatus: string;
  role: string;
  image?: string;
  authProviderId?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Email or Password is required");
        }

        const findUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!findUser) throw new CredentialsSignin("User is not found");

        if (!findUser.password) {
          throw new CredentialsSignin("User password is not set");
        }

        const MatchedPassword = compare(password, findUser.password);

        if (!MatchedPassword) throw new Error("Incorrect Password");

        const userData = {
          fullName: findUser.name,
          slug: findUser.slug,
          refId: findUser.refId,
          email: findUser.email,
          activeStatus: findUser.activeStatus,
          role: findUser.role,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        const t = token as IToken;
        session.user.id = t.id;
        session.user.email = t.email;
        // session.user.fullName = t.fullName;
        // session.user.slug = t.slug;
        // session.user.refId = t.refId;
        // session.user.activeStatus = t.activeStatus;
        // session.user.role = t.role;
        // session.user.image = t.image;
        // session.user.authProviderId = t.authProviderId;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as IUser;
        token.id = u.id;
        token.email = u.email;
        token.fullName = u.fullName;
        token.slug = u.slug;
        token.refId = u.refId;
        token.activeStatus = u.activeStatus;
        token.role = u.role;
        token.image = u.image;
        token.authProviderId = u.authProviderId;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email } = user;
          const existUser = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });
          if (!existUser) {
            // await prisma.user.create({
            //   email: email as string,
            //   fullName: name as string,
            //   slug: name?.replace(/\s+/g, "-").toLowerCase(),
            //   image: image as string,
            //   authProviderId: id as string,
            // });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
