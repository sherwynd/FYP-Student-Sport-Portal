import React from "react";
// import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

// import prisma from "@/databases/db";
// import EventCard from "@/components/event/EventCard";
export default async function Home() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
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
      </div>
      <h1>Most Popular</h1>
      <h1>Recommended</h1>
      <h1>Categories</h1>
      <ul className="event-grid sm:grid-flow-cols-1 grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <EventCard /> */}
      </ul>
    </>
  );
}
