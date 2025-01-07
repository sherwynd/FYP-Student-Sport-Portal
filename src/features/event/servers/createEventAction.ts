"use server";
import { redirect } from "next/navigation";

import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";

export const addEvent = async (_previousState: unknown, formData: FormData) => {
  const eventImage = formData.get("eventImage") as File | null;
  const title = formData.get("title") as string;
  const slug = (formData.get("title") as string)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const description = formData.get("description") as string;
  const courseLevel = formData.get("courseLevel") as string;
  const creditHour = Number(formData.get("creditHour"));
  const certificate = formData.get("certificate") as File | null;
  const eventType = formData.get("eventType") as string;
  const numberOfPeople = Number(formData.get("numberOfPeople"));

  let eventImageId: string | null = null;
  let eventCertificateId: string | null;

  if (!title) {
    return {
      titleError: "Title is required",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  const matchTitle = await prisma.event.findMany({
    where: {
      title: title,
    },
  });

  if (matchTitle.length > 0) {
    return {
      titleError: "Title Event has been used",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  if (!courseLevel) {
    return {
      courseLevelError: "Course Level is required",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  if (creditHour < 1) {
    return {
      creditHourError: "Credit Level cannot be lower than 0",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  if (!eventType) {
    return {
      eventTypeError: "Event Type is required",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  if (numberOfPeople && numberOfPeople < 0) {
    return {
      numberOfPeopleError: "Number of people cannot be lower than 0",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  if (
    !certificate ||
    certificate.size === 0 ||
    certificate.name === "undefined"
  ) {
    return {
      certificateError: "Certificate is required",
      fieldData: {
        title,
        description,
        courseLevel,
        creditHour,
        certificate,
        numberOfPeople,
        eventType,
      },
    };
  }

  try {
    const certificateBuffer = await convertFileToBufferService(certificate);
    const certificateRecord = await prisma.eventCertificate.create({
      data: {
        filename: certificate.name,
        contentType: certificate.type,
        data: certificateBuffer,
      },
    });

    eventCertificateId = certificateRecord.id;
  } catch (error) {
    console.error("Error uploading certificate:", error);
    throw new Error("Failed to upload certificate.");
  }

  if (eventImage && eventImage.size > 0 && eventImage.name !== "undefined") {
    try {
      const imageBuffer = await convertFileToBufferService(eventImage);
      const imageRecord = await prisma.eventImage.create({
        data: {
          filename: eventImage.name,
          contentType: eventImage.type,
          data: imageBuffer,
        },
      });

      eventImageId = imageRecord.id;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  try {
    await prisma.event.create({
      data: {
        title: title,
        slug: slug,
        description: description,
        courseLevel: courseLevel,
        creditHour: creditHour,
        eventImageId: eventImageId,
        eventCertificateId: eventCertificateId, // Associating event certificate ID (nullable)
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event.");
  }

  redirect("/event");
};
