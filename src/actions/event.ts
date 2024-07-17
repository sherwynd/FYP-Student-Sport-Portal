"use server";
import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";

export const addEvents = async (formData: FormData) => {
  await prisma.template.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      body: formData.get("body") as string,
    },
  });
  revalidatePath("/");
};

export const editEvents = async (formData: FormData, id: string) => {
  await prisma.template.update({
    where: {
      id: id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      body: formData.get("body") as string,
    },
  });
};

export const deleteEvents = async (id: string) => {
  await prisma.template.delete({
    where: {
      id: id,
    },
  });
};
