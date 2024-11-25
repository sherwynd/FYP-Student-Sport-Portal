import Link from "next/link";
import EventCard from "@/components/event/EventCard";
import prisma from "@/databases/db";

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
    <main className="flex flex-col items-center justify-center px-4 py-6">
      <Link href={`event/createEvent`}>
        <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
          Create Event
        </button>
      </Link>
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Map Events */}
        {eventData.map((data: TEvent) => (
          <EventCard event={data} key={data.id} />
        ))}
      </div>
    </main>
  );
}
