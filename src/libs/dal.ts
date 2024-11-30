import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/libs/session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }
  console.log("session", session);

  return { isAuth: true, userId: session.userId, role: session.role };
});
