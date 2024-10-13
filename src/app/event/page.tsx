import EventCard from "@/components/event/EventCard";
import prisma from "@/databases/db";
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
      <h2>Hello Event</h2>
      <Link href={`event/createEvent`}>Create Event</Link>
      <div className="event-list grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {eventData.map((data: TEvent) => (
          <EventCard event={data} key={data.id} />
        ))}
      </div>
    </main>
  );
}
