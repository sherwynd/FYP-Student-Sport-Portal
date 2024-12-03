"use server";

import prisma from "@/databases/db";

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

  try {
    await prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const unregisterEvent = async () => {};
