import { DataTable } from "@/components/ui/DataTable";
import { UserRegisterEventColumns } from "@/components/dataTableColumns/UserRegisterEventColumns";
import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventHistory = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });
  const userRegisterEventData = await prisma.eventRegistration.findMany({
    where: {
      userId: userData?.id as string,
    },
    include: {
      event: true,
    },
  });

  return (
    <div className="user-registration-event-data-table-container my-2 w-full max-w-7xl overflow-auto">
      {/* User Event Registration Data Table */}
      <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <DataTable
          filter={"none"}
          columns={UserRegisterEventColumns}
          data={userRegisterEventData}
        />
      </div>
    </div>
  );
};

export default EventHistory;
