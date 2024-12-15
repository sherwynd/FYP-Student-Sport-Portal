import RechartPieChart from "@/components/chart/PieChart";
import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const chartData = [
  { name: "Neck Index", value: 26 },
  { name: "Shoulder Index", value: 21 },
  { name: "Pelvic Index", value: 18 },
];

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
        <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
          Exercise Risk Evaluation
        </h2>
        <div className="flex justify-around">
          {chartData.map((data, index) => (
            <div key={index} className="w-1/3 text-center">
              <h3 className="mb-2 text-gray-700">{data.name}</h3>
              <RechartPieChart value={data.value} title={data.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
