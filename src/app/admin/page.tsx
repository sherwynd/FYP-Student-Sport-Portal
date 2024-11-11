// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import prisma from "@/databases/db";
// import TestChart from "@/components/chart/TestChart";
import { DataTable } from "@/components/ui/DataTable";
import { AdminEventDataColumns } from "@/components/admin/AdminTableColumns";

export default async function Admin() {
  const eventData = await prisma.event.findMany();
  // const session = await auth();
  // const user = session?.user;
  // if (user?.role === "admin") {
  //   redirect("/");
  // }
  return (
    <main className="flex items-center justify-center">
      {/* Data Table */}
      <DataTable columns={AdminEventDataColumns} data={eventData} />

      {/* Visualization Board */}
      {/* <div className="chart-table min-h-min w-full">
        <TestChart />
      </div> */}
    </main>
  );
}
