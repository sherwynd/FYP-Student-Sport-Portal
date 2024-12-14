"use server";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

export const deleteEvent = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  if (event.eventCertificateId) {
    try {
      await prisma.eventCertificate.delete({
        where: { id: event.eventCertificateId },
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error("Failed to delete image.");
    }
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
