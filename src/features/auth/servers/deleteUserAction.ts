"use server";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

export const deleteUser = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const id = formData.get("id") as string;

  console.log("id", id);
  try {
    await prisma.user.delete({
      where: { id },
    });
    console.log("Done");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }
  redirect(`/admin`);
};
