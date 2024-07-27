"use server";
import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";

export const addEvents = async (formData: FormData) => {
  console.log(formData);
  // await prisma.event.create({
  //   data: {
  //     title: formData.get("title") as string,
  //     slug: (formData.get("title") as string)
  //       .replace(/\s+/g, "-")
  //       .toLowerCase(),
  //     description: formData.get("description") as string,
  //   },
  // });
  revalidatePath("/");
};

export const editEvents = async (formData: FormData, id: string) => {
  await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      description: formData.get("description") as string,
    },
  });
};

export const deleteEvents = async (id: string) => {
  await prisma.event.delete({
    where: {
      id: id,
    },
  });
};
