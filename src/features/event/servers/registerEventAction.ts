"use server";

import prisma from "@/databases/db";
import { createReportSubmission } from "@/features/profile/servers/createReportSubmissionAction";

export const registerEvent = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const userId = formData.get("userId") as string;
  const eventId = formData.get("eventId") as string;
  const participationType = formData.get("participationType") as string;

  const existingRegistration = await prisma.eventRegistration.findFirst({
    where: {
      eventId,
    },
  });

  if (existingRegistration) {
    return {
      error: "User already registered for this event.",
    };
  }

  let eventRegistrationId;
  try {
    const data = await prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
        participationType,
      },
    });
    eventRegistrationId = data.id;

    createReportSubmission(eventId, userId, data.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

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

  return {
    message: "Successfully registered/apply the event.",
  };
};
