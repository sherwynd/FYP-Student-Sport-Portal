"use server";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

import convertImageToBuffer from "@/services/image/convertImageToBufferService";
export const addEvent = async (formData: FormData, imageFile: File | null) => {
  let eventData: {
    title: string;
    slug: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    certificate: string;
    eventImageId: string | null;
  } = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    description: formData.get("description") as string,
    courseLevel: formData.get("courseLevel") as string,
    creditHour: Number(formData.get("creditHour")),
    certificate: formData.get("certificate") as string,
    eventImageId: null,
  };

  let imageRecord = null;

  if (imageFile) {
    try {
      const imageBuffer = await convertImageToBuffer(imageFile);

      imageRecord = await prisma.eventImage.create({
        data: {
          filename: imageFile.name,
          contentType: imageFile.type,
          data: imageBuffer,
        },
      });

      eventData.eventImageId = imageRecord.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  try {
    await prisma.event.create({
      data: eventData,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event.");
  }

  redirect("/event");
};

export const editEvent = async (
  formData: FormData,
  imageFile: File | null,
  eventId: string,
) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId },
    include: { eventImage: true },
  });

  if (!existingEvent) {
    throw new Error("Event not found.");
  }

  let eventData: {
    title: string;
    slug: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    certificate: string;
    eventImageId: string | null;
  } = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    description: formData.get("description") as string,
    courseLevel: formData.get("courseLevel") as string,
    creditHour: Number(formData.get("creditHour")),
    certificate: formData.get("certificate") as string,
    eventImageId: existingEvent.eventImageId,
  };

  let imageRecord = null;

  if (imageFile) {
    try {
      const imageBuffer = await convertImageToBuffer(imageFile);

      if (existingEvent.eventImageId) {
        await prisma.eventImage.delete({
          where: { id: existingEvent.eventImageId },
        });
      }

      imageRecord = await prisma.eventImage.create({
        data: {
          filename: imageFile.name,
          contentType: imageFile.type,
          data: imageBuffer,
        },
      });

      eventData.eventImageId = imageRecord.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  try {
    await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event.");
  }

  redirect(`/event/${eventData.slug}`);
};

export const deleteEvent = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { eventImage: true },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  if (event.eventImageId) {
    try {
      await prisma.eventImage.delete({
        where: { id: event.eventImageId },
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error("Failed to delete image.");
    }
  }

  try {
    await prisma.event.delete({
      where: { id: eventId },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event.");
  }

  redirect("/event");
};
