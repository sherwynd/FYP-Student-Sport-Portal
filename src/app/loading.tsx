import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center">
      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Skeleton cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[180px] w-[300px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
