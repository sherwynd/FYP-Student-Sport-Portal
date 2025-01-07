import React from "react";
import prisma from "@/databases/db";
import EventCard from "@/features/event/components/EventCard";

export default async function Home() {
  const beginnerEvents = await prisma.event.findMany({
    where: {
      courseLevel: "beginner",
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const intermediateEvents = await prisma.event.findMany({
    where: {
      courseLevel: "intermediate",
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const professionalEvents = await prisma.event.findMany({
    where: {
      courseLevel: "professional",
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const competitionEvents = await prisma.event.findMany({
    where: {
      type: "competition",
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  const workshopEvents = await prisma.event.findMany({
    where: {
      type: "workshop",
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pt-4">
      {/* Conditionally Render Beginner Courses */}
      {beginnerEvents.length > 0 && (
        <section className="py-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            Beginner Courses
          </h1>
          <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {beginnerEvents.map((event) => (
              <li key={event.id} className="relative">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Conditionally Render Intermediate Courses */}
      {intermediateEvents.length > 0 && (
        <section className="py-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            Intermediate Courses
          </h1>
          <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {intermediateEvents.map((event) => (
              <li key={event.id} className="relative">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Conditionally Render Professional Courses */}
      {professionalEvents.length > 0 && (
        <section className="py-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            Professional Courses
          </h1>
          <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {professionalEvents.map((event) => (
              <li key={event.id} className="relative">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Conditionally Render Competitions */}
      {competitionEvents.length > 0 && (
        <section className="py-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            Competitions
          </h1>
          <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {competitionEvents.map((event) => (
              <li key={event.id} className="relative">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Conditionally Render Workshops */}
      {workshopEvents.length > 0 && (
        <section className="py-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            Workshops
          </h1>
          <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {workshopEvents.map((event) => (
              <li key={event.id} className="relative">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
