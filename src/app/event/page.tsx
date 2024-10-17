import EventCard from "@/components/event/EventCard";
import prisma from "@/databases/db";
import { Button, Grid } from "@chakra-ui/react";
import Link from "next/link";

type TEvent = {
  id: string;
  slug: string;
  // refId: string;
  title: string;
  description: string;
  courseLevel: string;
  creditHour: number;
  certificate: string;
  // status: string | null;
  // image: string | null;
  // createdAt: Date;
  // updatedAt: Date;
};

export default async function Event() {
  const eventData = await prisma.event.findMany();

  return (
    <main className="mx-4">
      <Link href={`event/createEvent`}>
        <Button margin={2}>Create Event</Button>
      </Link>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={2}
      >
        {eventData.map((data: TEvent) => (
          <EventCard event={data} key={data.id} />
        ))}
      </Grid>
    </main>
  );
}
