import RechartPieChart from "@/components/chart/PieChart";
import RiskInjuryRadarChart from "@/components/chart/RiskInjuryRadarChart";
import prisma from "@/databases/db";
import UserDashboardButton from "@/features/profile/components/UserDashboardButton";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const UserDashboard = async ({ params }: ParamProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const riskData = await prisma.riskEvaluation.findUnique({
    where: {
      userId: userData?.id,
    },
  });

  // Prepare the radar chart data only if riskData exists
  const radarData = riskData
    ? [
        { subject: "Mobility", value: riskData.mobility || 0, fullMark: 100 },
        { subject: "Stability", value: riskData.stability || 0, fullMark: 100 },
        { subject: "Symmetry", value: riskData.symmetry || 0, fullMark: 100 },
      ]
    : [];

  const chartData = riskData
    ? [
        { name: "Neck Risk Index", value: riskData.neckRiskIndex || 0 },
        { name: "Shoulder Risk Index", value: riskData.shoulderRiskIndex || 0 },
        { name: "Pelvic Risk Index", value: riskData.pelvicRiskIndex || 0 },
        {
          name: "Lower Limb Risk Index",
          value: riskData.lowerLimbRiskIndex || 0,
        },
        { name: "Torso Risk Index", value: riskData.torsoRiskIndex || 0 },
      ]
    : [];

  return (
    <div className="user-data-table-container my-2 w-full max-w-7xl overflow-auto">
      <UserDashboardButton id={userData?.id || ""} />
      <div className="chart-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        {/* Conditionally render the charts only if riskData exists */}
        {riskData ? (
          <>
            <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
              Exercise Risk Evaluation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {chartData.map((data, index) => (
                <div key={index} className="w-full text-center">
                  <h3 className="mb-2 text-gray-700">{data.name}</h3>
                  <RechartPieChart value={data.value} title={data.name} />
                </div>
              ))}
            </div>
            <div className="flex justify-around">
              <RiskInjuryRadarChart data={radarData} />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            No risk evaluation data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
