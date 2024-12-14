import React from "react";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/databases/db";
import EventCard from "@/features/event/components/EventCard";

// import prisma from "@/databases/db";
// import EventCard from "@/components/event/EventCard";
export default async function Home() {
  const newEventData = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc", // Sort by updatedAt in descending order
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
    take: 4, // Limit to 4 most recent updates (optional)
  });

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4">
      {/* Carousel Section */}
      {/* <div className="flex items-center justify-center">
        <Carousel className="h-48 w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card>
                    <CardContent className="flex h-full items-center justify-center bg-gray-100">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}

      {/* Recent Event Section */}
      <section>
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
          Recent Events
        </h1>
        <ul className="grid w-full max-w-[1440px] gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newEventData.map((event) => (
            <li key={event.id} className="relative">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
