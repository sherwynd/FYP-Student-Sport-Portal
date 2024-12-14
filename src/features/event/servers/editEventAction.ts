"use server";
import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";
import { redirect } from "next/navigation";

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
    certificate: File;
    eventImageId: string | null;
    eventCertificateId: string | null;
  } = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    description: formData.get("description") as string,
    courseLevel: formData.get("courseLevel") as string,
    creditHour: Number(formData.get("creditHour")),
    certificate: formData.get("certificate") as File,
    eventImageId: existingEvent.eventImageId || null,
    eventCertificateId: existingEvent.eventCertificateId || null,
  };

  console.log(eventData, imageFile, eventId);

  if (
    !eventData.title ||
    !eventData.slug ||
    !eventData.description ||
    !eventData.courseLevel ||
    !eventData.creditHour
  ) {
    throw new Error("Required fields are missing.");
  }

  if (imageFile) {
    try {
      const imageBuffer = await convertFileToBufferService(imageFile);

      console.log("Image Buffer:", imageBuffer);

      if (!imageBuffer) {
        throw new Error("imageBuffer are missing.");
      }
      if (existingEvent.eventImageId) {
        const imageRecord = await prisma.eventImage.update({
          where: {
            id: existingEvent.eventImageId,
          },
          data: {
            filename: imageFile.name,
            contentType: imageFile.type,
            data: imageBuffer,
          },
        });
        eventData.eventImageId = imageRecord.id;
      } else {
        const imageRecord = await prisma.eventImage.create({
          data: {
            filename: imageFile.name,
            contentType: imageFile.type,
            data: imageBuffer,
          },
        });
        eventData.eventImageId = imageRecord.id;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  if (eventData.certificate) {
    try {
      const certificateBuffer = await convertFileToBufferService(
        eventData.certificate,
      );

      if (!certificateBuffer) {
        throw new Error("certificateBuffer are missing.");
      }

      if (existingEvent.eventCertificateId) {
        const certificateRecord = await prisma.eventCertificate.update({
          where: { id: existingEvent.eventCertificateId },
          data: {
            filename: eventData.certificate.name,
            contentType: eventData.certificate.type,
            data: certificateBuffer,
          },
        });
        eventData.eventCertificateId = certificateRecord.id;
      } else {
        const certificateRecord = await prisma.eventCertificate.create({
          data: {
            filename: eventData.certificate.name,
            contentType: eventData.certificate.type,
            data: certificateBuffer,
          },
        });
        eventData.eventCertificateId = certificateRecord.id;
      }
    } catch (error) {
      console.error("Error uploading certificate:", error);
      throw new Error("Failed to upload certificate.");
    }
  }

  console.log("Event Data Before Update:", eventData);

  if (!eventData || Object.keys(eventData).length === 0) {
    throw new Error("Event data is empty or invalid.");
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
