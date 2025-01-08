import { DataTable } from "@/components/ui/DataTable";
import prisma from "@/databases/db";
import { ApplyServiceColumns } from "@/features/profile/components/ApplyServiceColumns";

const UserService = async () => {
  const applyServiceData = await prisma.eventRegistration.findMany({
    where: {
      participationType: "helper",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      event: {
        select: {
          title: true, // Include the event certificate data
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
          columns={ApplyServiceColumns}
          data={applyServiceData}
        />
      </div>
    </div>
  );
};

export default UserService;
