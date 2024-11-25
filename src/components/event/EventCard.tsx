import Link from "next/link";
import Image from "next/image";

type EventCardProps = {
  event: {
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
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <>
      <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <Link href={`event/${event.slug}`}>
          <div>
            <Image
              src="/test-event-image.jpg"
              width={800}
              height={200}
              alt="Picture of the event image"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="mb-2 text-lg font-bold">{event.title}</h2>
              <p className="mb-4 text-sm text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">
                Credit Hour: {event.creditHour}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
