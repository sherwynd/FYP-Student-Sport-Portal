import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/libs/session";
import { cache } from "react";
import prisma from "@/databases/db";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return {
    isAuth: true,
    sessionId: session.id,
    userId: session.userId,
    role: session.userRole,
    slug: session.userSlug,
  };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.user.findMany({
      where: {
        id: session.userId,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});

export const getUserBySlug = cache(async (slug: string) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        slug: slug,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
