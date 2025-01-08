import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { UserReportSubmissionColumns } from "@/features/profile/components/UserReportSubmissionColumns";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserReport = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const eventRegistrationData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id,
    },
    select: {
      id: true, // Include the id
      event: {
        select: {
          title: true,
        },
      },
    },
  });

  const reportSubmissionData = await prisma.reportSubmission.findMany({
    where: {
      userId: userData?.id,
    },
  });

  const fixedData = reportSubmissionData.map((report) => {
    // Find corresponding event registration for the report
    const eventRegistration = eventRegistrationData.find(
      (registration) => registration.id === report.eventRegistrationId,
    );

    return {
      id: report.id,
      eventRegistrationId: report.eventRegistrationId,
      userId: userData?.id,
      userSlug: userData?.slug,
      eventTitle: eventRegistration?.event.title, // Fallback if title is missing
      status: report.status,
      submittedAt: report.submittedAt, // Optional, include other fields if needed
    };
  });

  return (
    <div className="user-report-data-table-container my-2 w-full max-w-7xl overflow-auto">
      {/* Admin User Data Table */}
      <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <DataTable
          filter={"none"}
          columns={UserReportSubmissionColumns}
          data={fixedData}
        />
      </div>
    </div>
  );
};

export default UserReport;
