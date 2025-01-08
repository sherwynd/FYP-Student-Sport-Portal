import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { UserCertificateColumns } from "@/features/profile/components/UserCertificateColumns";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserCertificate = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const eventRegistrationData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id as string,
    },
    include: {
      event: {
        include: {
          eventCertificate: true, // Include the event certificate data
        },
      },
    },
  });

  const reportSubmissionData = await prisma.reportSubmission.findMany({
    where: {
      userId: userData?.id as string,
      status: "Submitted", // Only include submitted reports
    },
  });

  // const getCertificateDownloadUrl = (
  //   certificateData: Buffer,
  //   contentType: string,
  // ) => {
  //   if (!certificateData || certificateData.length === 0) {
  //     console.error("Invalid certificate data: Empty or undefined");
  //   }

  //   const base64Data = certificateData.toString("base64");
  //   const downloadUrl = `data:${contentType};base64,${base64Data}`;
  //   return downloadUrl;
  // };

  const certificateThatSubmittedReportData = eventRegistrationData
    .filter((registration) => {
      // Check if there's a matching report submission for this eventRegistration
      return reportSubmissionData.some(
        (report) => report.eventRegistrationId === registration.id,
      );
    })
    .map((registration) => {
      const event = registration.event;

      if (event && event.eventCertificate) {
        const eventCertificate = event.eventCertificate;

        // Generate download URL for the certificate
        const base64Data = eventCertificate.data.toString("base64");
        const downloadUrl = `data:${eventCertificate.contentType};base64,${base64Data}`;

        return {
          id: eventCertificate.id,
          filename: eventCertificate.filename,
          contentType: eventCertificate.contentType,
          downloadUrl,
        };
      }

      return null; // Return null if no certificate is available
    })
    .filter((certificate) => certificate !== null); // Remove null values

  return (
    <div className="certificate-data-table-container my-2 w-full max-w-7xl overflow-auto">
      {/* Certificate User Data Table */}
      <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <DataTable
          filter={"none"}
          columns={UserCertificateColumns}
          data={certificateThatSubmittedReportData}
        />
      </div>
    </div>
  );
};

export default UserCertificate;
