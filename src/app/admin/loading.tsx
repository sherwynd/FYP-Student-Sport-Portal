import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="admin-main flex flex-col items-center justify-center px-4 py-6">
      {/* Skeletons for 2 Stats Containers */}
      <div className="my-4 flex w-full max-w-7xl gap-4">
        <Skeleton className="stat-card-skeleton flex h-[180px] w-1/2 flex-col items-center justify-center rounded-lg" />
        <Skeleton className="stat-card-skeleton flex h-[180px] w-1/2 flex-col items-center justify-center rounded-lg" />
      </div>

      {/* Long Box Skeleton for Data Table or Chart */}
      <div className="data-table-container my-2 w-full max-w-7xl overflow-auto">
        <Skeleton className="inner-data-table h-[300px] w-full rounded-lg border" />
      </div>
    </main>
  );
}
