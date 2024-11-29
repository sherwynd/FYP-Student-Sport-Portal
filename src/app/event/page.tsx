import Link from "next/link";
import EventCard from "@/components/event/EventCard";
import prisma from "@/databases/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";

type EventProps = {
  id: string;
  slug: string;
  title: string;
  description: string;
  courseLevel: string;
  creditHour: number;
  certificate: string;
  image: { filename: string; contentType: string; data: Buffer } | null;
};

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    role?: string;
  }
}

const Event = async () => {
  const eventData = await prisma.event.findMany({
    include: {
      image: true,
    },
  });

  const session = await getServerSession(authOptions);
  return (
    <main className="flex flex-col items-center justify-center px-4 py-6">
      {session?.user?.role === "admin" && (
        <Link href="/event/createEvent">
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            Create Event
          </button>
        </Link>
      )}
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Map Events */}
        {eventData.map((data: EventProps) => (
          <EventCard event={data} key={data.id} />
        ))}
      </div>
    </main>
  );
};

export default Event;
