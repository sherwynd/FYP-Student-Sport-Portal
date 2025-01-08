"use server";

import prisma from "@/databases/db";
import { revalidatePath } from "next/cache";

export const updateServiceAction = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  const userId = formData.get("userId") as string;
  const status = formData.get("status") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { slug: true, isActive: true },
  });

  try {
    await prisma.eventRegistration.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
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
  revalidatePath(`/profile/${user?.slug}/service`);
};
