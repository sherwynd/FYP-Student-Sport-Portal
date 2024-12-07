import { UserCertificateColumns } from "@/components/dataTableColumns/UserCertificateColumns";
import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";

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
      reportSubmission: true, // Include report submission status to check if it's submitted
    },
  });

  const getCertificateDownloadUrl = (
    certificateData: Buffer,
    contentType: string,
  ) => {
    if (!certificateData || certificateData.length === 0) {
      console.error("Invalid certificate data: Empty or undefined");
    }

    const base64Data = certificateData.toString("base64");
    const downloadUrl = `data:${contentType};base64,${base64Data}`;

    // console.log("Generated Download URL:", downloadUrl);

    // const blob = new Blob([certificateData], { type: contentType }); // Create Blob with the content type
    // const blobUrl = URL.createObjectURL(blob); // Generate Blob URL
    // console.log("Generated Blob URL:", blobUrl); // Log the Blob URL for debugging
    return downloadUrl;
  };

  const certificateThatSubmittedReportData = eventRegistrationData
    .filter(
      (registration) => registration.reportSubmission?.status === "Submitted",
    ) // Only process those who submitted reports
    .map((registration) => {
      const event = registration.event; // Access the event object within each registration
      if (event) {
        const eventCertificate = event.eventCertificate;

        // Check if there is a certificate and if the report is submitted
        if (eventCertificate) {
          // Create a new certificate data object for the table
          const certificateData = eventCertificate.data; // This is the Buffer containing PDF binary data
          const certificateUrl = getCertificateDownloadUrl(
            certificateData,
            eventCertificate.contentType,
          );

          return {
            id: eventCertificate.id,
            filename: eventCertificate.filename,
            contentType: eventCertificate.contentType,
            downloadUrl: certificateUrl, // Convert certificate data to base64 for download
          };
        } else {
          console.log("No certificate available for this event.");
          return null; // If no certificate, return null
        }
      } else {
        return null; // If no event, return null
      }
    })
    .filter((certificate) => certificate !== null); // Remove any null values (if there were no certificate for that event)
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
