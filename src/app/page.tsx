import React from "react";
// import Link from "next/link";

// import prisma from "@/databases/db";
// import EventCard from "@/components/event/EventCard";
export default async function Home() {
  return (
    <main>
      <h1>Most Popular</h1>
      <h1>Recommended</h1>
      <h1>Categories</h1>
      <ul className="event-grid sm:grid-flow-cols-1 grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <EventCard /> */}
      </ul>
    </main>
  );
}
