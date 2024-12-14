"use server";
import { redirect } from "next/navigation";

import prisma from "@/databases/db";
import convertFileToBufferService from "@/services/file/convertFileToBufferService";

export const addEvent = async (formData: FormData, imageFile: File | null) => {
  let eventData: {
    title: string;
    slug: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    certificate: File | null;
    eventImageId: string | null;
    eventCertificateId: string | null;
  } = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    description: formData.get("description") as string,
    courseLevel: formData.get("courseLevel") as string,
    creditHour: Number(formData.get("creditHour")),
    certificate: formData.get("certificate") as File | null,
    eventImageId: null,
    eventCertificateId: null,
  };

  if (imageFile) {
    try {
      const imageBuffer = await convertFileToBufferService(imageFile);
      const imageRecord = await prisma.eventImage.create({
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

  if (eventData.certificate) {
    try {
      const certificateBuffer = await convertFileToBufferService(
        eventData.certificate,
      );
      const certificateRecord = await prisma.eventCertificate.create({
        data: {
          filename: eventData.certificate.name,
          contentType: eventData.certificate.type,
          data: certificateBuffer,
        },
      });

      eventData.eventCertificateId = certificateRecord.id;
    } catch (error) {
      console.error("Error uploading certificate:", error);
      throw new Error("Failed to upload certificate.");
    }
  }

  try {
    await prisma.event.create({
      data: {
        title: eventData.title,
        slug: eventData.slug,
        description: eventData.description,
        courseLevel: eventData.courseLevel,
        creditHour: eventData.creditHour,
        eventImageId: eventData.eventImageId, // Associating event image ID
        eventCertificateId: eventData.eventCertificateId, // Associating event certificate ID (nullable)
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event.");
  }

  redirect("/event");
};
