"use server";

import prisma from "@/databases/db";
export const submitReportSubmission = async (
  eventId: string,
  userId: string,
  eventRegistrationId: string,
) => {
  try {
    await prisma.reportSubmission.update({
      where: {
        userId,
        eventId,
        eventRegistrationId,
      },
      data: {
        submittedAt: new Date(),
        status: "Submitted",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
