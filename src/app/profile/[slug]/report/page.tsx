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
  const reportSubmissionData = await prisma.reportSubmission.findMany({
    where: {
      userId: userData?.id as string,
    },
    include: {
      eventRegistration: {
        select: {
          user: {
            select: {
              slug: true,
            },
          },
          event: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="user-report-data-table-container my-2 w-full max-w-7xl overflow-auto">
      {/* Admin User Data Table */}
      <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <DataTable
          filter={"none"}
          columns={UserReportSubmissionColumns}
          data={reportSubmissionData}
        />
      </div>
    </div>
  );
};

export default UserReport;
