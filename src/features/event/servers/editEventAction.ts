"use server";
import prisma from "@/databases/db";
import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";
import { redirect } from "next/navigation";

export const editEvent = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const eventImage = formData.get("eventImage") as File;
  const title = formData.get("title") as string;
  const slug = (formData.get("title") as string)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const description = formData.get("description") as string;
  const courseLevel = formData.get("courseLevel") as string;
  const creditHour = Number(formData.get("creditHour"));
  const certificate = formData.get("certificate") as File;
  const eventId = formData.get("eventId") as string;
  let eventImageId = formData.get("eventImageId") as string;
  const eventCertificateId = formData.get("eventCertificateId") as string;
  const eventType = formData.get("eventType") as string;
  const numberOfPeople = Number(formData.get("numberOfPeople"));

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

  const matchTitle = await prisma.event.findFirst({
    where: {
      title: title,
      NOT: {
        id: eventId, // Exclude the current event by its ID
      },
    },
  });

  if (matchTitle) {
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

  if (creditHour && creditHour < 1) {
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

  if (eventImage && certificate.size > 0 && certificate.name !== "undefined") {
    try {
      const imageBuffer = await convertFileToBufferService(eventImage);

      if (!imageBuffer) {
        throw new Error("imageBuffer are missing.");
      }
      if (eventImageId) {
        const imageRecord = await prisma.eventImage.update({
          where: {
            id: eventImageId,
          },
          data: {
            filename: eventImage.name,
            contentType: eventImage.type,
            data: imageBuffer,
          },
        });
        eventImageId = imageRecord.id;
      } else {
        const imageRecord = await prisma.eventImage.create({
          data: {
            filename: eventImage.name,
            contentType: eventImage.type,
            data: imageBuffer,
          },
        });
        eventImageId = imageRecord.id;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  }

  if (certificate && certificate.size > 0 && certificate.name !== "undefined") {
    try {
      const certificateBuffer = await convertFileToBufferService(certificate);

      if (!certificateBuffer) {
        throw new Error("certificateBuffer are missing.");
      }

      await prisma.eventCertificate.update({
        where: { id: eventCertificateId },
        data: {
          filename: certificate.name,
          contentType: certificate.type,
          data: certificateBuffer,
        },
      });
    } catch (error) {
      console.error("Error uploading certificate:", error);
      throw new Error("Failed to upload certificate.");
    }
  }

  const updateData: any = {};

  // Conditionally add fields to the update object
  if (description) updateData.description = description;
  if (courseLevel) updateData.courseLevel = courseLevel;
  if (creditHour > 0) updateData.creditHour = creditHour;
  if (eventType) updateData.type = eventType;
  if (numberOfPeople > 0) updateData.numberOfPeople = numberOfPeople;

  try {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: title,
        slug: slug,
        ...updateData,
        eventImageId: eventImageId,
        eventCertificateId: eventCertificateId,
      },
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event.");
  }

  redirect(`/event/${slug}`);
};
