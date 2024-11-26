// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import prisma from "@/databases/db";
import TestChart from "@/components/chart/TestChart";
import { DataTable } from "@/components/ui/DataTable";
import { AdminEventDataColumns } from "@/components/dataTableColumns/AdminEventTableColumns";
import { AdminUserDataColumns } from "@/components/dataTableColumns/AdminUserTableColumns";

export default async function Admin() {
  const eventData = await prisma.event.findMany();
  const userData = await prisma.user.findMany();
  return (
    <main className="admin-main flex flex-col items-center justify-center px-4 py-6">
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
