"use server";
import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addEvent = async (formData: FormData, imageFile: File | null) => {
  const eventData: {
    title: string;
    slug: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    certificate: string;
    image?: string;
  } = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    description: formData.get("description") as string,
    courseLevel: formData.get("courseLevel") as string,
    creditHour: Number(formData.get("creditHour")),
    certificate: formData.get("certificate") as string,
  };

  if (imageFile) {
    const formData = new FormData(); // Create FormData instance
    formData.append("file", imageFile); // Append the file

    const response = await fetch(
      "http://localhost:3000/api/event/uploadEventImage",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const imageData = await response.json();

    eventData.image = imageData.id;
  }

  await prisma.event.create({
    data: eventData,
  });

  revalidatePath("/event");
  redirect("/event");
};

export const editEvent = async (formData: FormData, id: string) => {
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

export const deleteEvent = async (id: string) => {
  await prisma.event.delete({
    where: {
      id: id,
    },
  });
};
