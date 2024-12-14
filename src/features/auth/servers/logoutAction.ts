"use server";
import { deleteSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = await cookies();
  deleteSession();
  cookieStore.delete("session");
  redirect("/auth/login");
}
