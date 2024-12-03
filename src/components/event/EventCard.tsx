import Link from "next/link";
import Image from "next/image";

type EventCardProps = {
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    eventCertificate: {
      filename: string;
      contentType: string;
      data: Buffer;
    } | null;
    eventImage: { filename: string; contentType: string; data: Buffer } | null;
  };
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <>
      <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <Link href={`event/${event.slug}`}>
          <div>
            {/* If image exists, display it */}
            {event.eventImage ? (
              <Image
                src={`data:${event.eventImage.contentType};base64,${event.eventImage.data.toString("base64")}`}
                width={800}
                height={200}
                alt={event.title}
                className="event-image h-48 w-full object-cover"
              />
            ) : (
              <Image
                src="/test-event-image.jpg"
                width={800}
                height={200}
                alt="Picture of the event image"
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="mb-2 text-lg font-bold">{event.title}</h2>
              <p className="mb-4 text-sm text-gray-700">
                {event.eventCertificate?.filename}
              </p>
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
