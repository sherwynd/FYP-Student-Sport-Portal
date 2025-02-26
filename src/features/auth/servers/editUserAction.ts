"use server";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

enum Role {
  Admin = "admin",
  User = "user",
  Student = "student",
  University = "university",
  Industry = "industry",
}

export const editUser = async (_previousState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const slug = name.replace(/\s+/g, "-").toLowerCase();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Role;

  if (!name) {
    return {
      nameError: "Name is required",
      fieldData: {
        name,
        role,
      },
    };
  }

  const currentUser = await prisma.user.findUnique({
    where: { id },
  });

  if (currentUser && name !== currentUser.name) {
    const existingUser = await prisma.user.findFirst({
      where: {
        name: name,
        NOT: { id },
      },
    });

    if (existingUser) {
      return {
        nameError: "Name has been used",
        fieldData: { name, role },
      };
    }
  }

  if (!role) {
    return {
      roleError: "Role selection is required",
      fieldData: {
        name,
        role,
      },
    };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        slug,
        role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
  }

  redirect(`/admin`);
};
