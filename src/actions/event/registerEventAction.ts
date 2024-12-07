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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    // Only update if not already active
    if (!user?.isActive) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive: true,
        },
      });
    }
  } catch (error) {
    console.error(error, "Error registering event");
  }
};

export const unregisterEvent = async () => {};
