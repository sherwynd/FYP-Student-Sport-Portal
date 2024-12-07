// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import prisma from "@/databases/db";
import TestChart from "@/components/chart/TestChart";
import { DataTable } from "@/components/ui/DataTable";
import { AdminEventDataColumns } from "@/components/dataTableColumns/AdminEventTableColumns";
import { AdminUserDataColumns } from "@/components/dataTableColumns/AdminUserTableColumns";

export default async function Admin() {
  const activeUsers = await prisma.user.count({
    where: {
      isActive: true,
    },
  });

  const totalUsers = await prisma.user.count();

  const activeUsersPercentage = (activeUsers / totalUsers) * 100;

  const mostPopularEvent = await prisma.event.findFirst({
    orderBy: {
      eventRegistrations: {
        _count: "desc", // Sort by the number of registrations (most first)
      },
    },
    include: {
      eventRegistrations: true, // Include the registrations to get the count
    },
  });

  const registrationCount = mostPopularEvent
    ? mostPopularEvent.eventRegistrations.length
    : 0;

  const eventData = await prisma.event.findMany({
    include: {
      eventCertificate: {
        select: {
          filename: true, // Only include the filename
        },
      },
    },
  });
  const userData = await prisma.user.findMany();
  return (
    <main className="admin-main flex flex-col items-center justify-center px-4 py-6">
      {/* 3 Stats Containers */}
      <div className="my-4 flex w-full max-w-7xl gap-4">
        <div className="stat-card flex w-1/2 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-2xl">{activeUsersPercentage.toFixed(2)}%</p>
          <p className="text-sm">
            Total Active Users: {activeUsers} / {totalUsers}
          </p>
        </div>

        <div className="stat-card flex w-1/2 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold">Most Popular Event</h3>
          <p className="text-2xl">
            {mostPopularEvent?.title || "No data available"}
          </p>
          <p className="text-sm">
            Total Registrations: {registrationCount || 0}
          </p>
        </div>
      </div>
      <div className="event-data-table-container my-2 w-full max-w-7xl overflow-auto">
        {/* Admin Event Data Table */}
        <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <DataTable
            filter={"title"}
            columns={AdminEventDataColumns}
            data={eventData}
          />
        </div>
      </div>
      <div className="user-data-table-container my-2 w-full max-w-7xl overflow-auto">
        {/* Admin User Data Table */}
        <div className="inner-data-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <DataTable
            filter={"name"}
            columns={AdminUserDataColumns}
            data={userData}
          />
        </div>
      </div>

      {/* Visualization Board */}
      <div className="chart-table-container my-2 w-full max-w-7xl overflow-auto">
        {/* Data Table */}
        <div className="chart-table rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <TestChart />
        </div>
      </div>
    </main>
  );
}
