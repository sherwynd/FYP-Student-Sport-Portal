"use server";

import prisma from "@/databases/db";

export const createReportSubmission = async (
  eventId: string,
  userId: string,
  eventRegistrationId: string,
) => {
  try {
    await prisma.reportSubmission.create({
      data: {
        userId,
        eventId,
        eventRegistrationId,
        status: "Not Submitted",
      },
    });
  } catch (error) {
    console.error(error, "Error creating report submission");
  }
};
