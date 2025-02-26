import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-scree p-4">
      <div className="container mx-auto">
        {/* Two Tabs Layout */}
        <div className="flex flex-col items-start gap-4 md:flex-row">
          {/* Left Tab: Profile Skeleton */}
          <div className="mx-auto max-w-md flex-shrink-0 rounded-lg text-center md:w-1/3">
            <Skeleton className="h-80 w-full rounded-xl" />
            {/* Simplified profile area */}
          </div>

          {/* Right Tab: Navigation Menu and Content Area Skeleton */}
          <div className="flex flex-col gap-4 md:w-2/3">
            <Skeleton className="h-12 w-full rounded-lg" />
            {/* Navigation menu placeholder */}
            <Skeleton className="h-96 w-full rounded-lg" />
            {/* Main content area placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
}
