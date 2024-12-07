"use server";

import prisma from "@/databases/db";
import { createReportSubmission } from "@/actions/report/createReportSubmissionAction";

export const registerEvent = async (eventId: string, userId: string) => {
  const existingRegistration = await prisma.eventRegistration.findFirst({
    where: {
      userId,
      eventId,
    },
  });

  if (existingRegistration) {
    throw new Error("User already registered for this event.");
  }

  let eventRegistrationId;
  try {
    const data = await prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
      },
    });
    eventRegistrationId = data.id;

    createReportSubmission(eventId, userId, eventRegistrationId);
  } catch (error) {
    console.error(error, "Error registering event");
  }
};

export const unregisterEvent = async () => {};
