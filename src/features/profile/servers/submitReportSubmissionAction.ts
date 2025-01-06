"use server";

import prisma from "@/databases/db";
import { redirect } from "next/navigation";

import convertFileToBufferService from "@/features/files/services/convertFileToBufferService";

export const submitReportSubmission = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const reportFile = formData.get("reportFile") as File;
  const reportSubmissionId = formData.get("reportSubmissionId") as string;
  const slug = formData.get("slug") as string;

  if (!reportFile) {
    return {
      reportFileError: "Please provide the file",
    };
  }

  try {
    const reportFileBuffer = await convertFileToBufferService(reportFile);
    await prisma.reportFile.create({
      data: {
        filename: reportFile.name,
        contentType: reportFile.type,
        data: reportFileBuffer,
        reportSubmissionId: reportSubmissionId,
      },
    });
  } catch (error) {
    console.error("Error uploading certificate:", error);
    throw new Error("Failed to upload certificate.");
  }

  try {
    await prisma.reportSubmission.update({
      where: {
        id: reportSubmissionId,
      },
      data: {
        submittedAt: new Date(),
        status: "Submitted",
      },
    });
  } catch (error) {
    console.error(error);
  }
  return redirect(`/profile/${slug}/report`);
};
