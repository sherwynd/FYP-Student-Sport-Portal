"use server";
import prisma from "@/databases/db";

export const deleteEvent = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      eventImage: true,
      eventCertificate: true,
      eventRegistrations: true,
    },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  try {
    // Delete report submissions associated with the event
    await prisma.reportSubmission.deleteMany({
      where: { eventId },
    });

    if (event.eventRegistrations.length > 0) {
      await prisma.eventRegistration.deleteMany({
        where: { eventId: eventId },
      });
    }

    // Delete associated event image
    if (event.eventImageId) {
      await prisma.eventImage.delete({
        where: { id: event.eventImageId },
      });
    }

    // Delete associated event certificate
    if (event.eventCertificateId) {
      await prisma.eventCertificate.delete({
        where: { id: event.eventCertificateId },
      });
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting event or its dependencies:", error);
    throw new Error("Failed to delete event.");
  }
};
