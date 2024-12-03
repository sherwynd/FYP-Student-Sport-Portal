import { RechartBarChart } from "@/components/chart/BarChart";
import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserDashboard = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  console.log(userData);

  return (
    <div className="user-data-table-container my-2 w-full max-w-7xl overflow-auto">
      {/* User Dashboard Data Table */}
      <div className="chart-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <RechartBarChart />
      </div>
    </div>
  );
};

export default UserDashboard;
