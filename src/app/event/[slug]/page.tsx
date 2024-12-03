import prisma from "@/databases/db";

import Image from "next/image";
import Link from "next/link";
import DeleteAlertBox from "@/components/common/DeleteAlertBox";
import { verifySession } from "@/libs/dal";
import { registerEvent } from "@/actions/event/registerEventAction";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventId = async ({ params }: ParamProps) => {
  const currentUser = await verifySession();

  const eventIdData = await await prisma.event.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
  });

  const registerEventWithId = registerEvent.bind(
    null,
    eventIdData?.id as string,
    currentUser?.userId as string,
  );
  return (
    <section className="flex flex-col items-center">
      {/* Image Section */}
      <div className="relative h-72 w-full bg-gray-200">
        {eventIdData?.eventImage ? (
          <Image
            src={`data:${eventIdData.eventImage.contentType};base64,${eventIdData.eventImage.data.toString("base64")}`}
            width={800}
            height={200}
            alt={eventIdData.title}
            className="event-detail-image h-full w-full object-cover"
          />
        ) : (
          <Image
            src="/test-event-image.jpg"
            width={800}
            height={200}
            alt="Picture of the event image"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Title & Description */}
      <div className="w-full max-w-4xl px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {eventIdData?.title}
        </h1>
        <p className="mt-2 text-gray-600">{eventIdData?.description}</p>
      </div>

      {/* Details Section */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <h2 className="text-lg font-semibold text-gray-700">Certificate</h2>
          <p className="text-gray-600">
            {eventIdData?.eventCertificate?.filename || "N/A"}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <h2 className="text-lg font-semibold text-gray-700">Credit Hours</h2>
          <p className="text-gray-600">{eventIdData?.creditHour || "0"}</p>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <h2 className="text-lg font-semibold text-gray-700">Course Level</h2>
          <p className="text-gray-600">{eventIdData?.courseLevel || "N/A"}</p>
        </div>
      </div>
      {currentUser?.role === "admin" && (
        <>
          <Link href={`/event/editEvent/${eventIdData?.id}`}>
            <button className="mb-4 rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
              Edit Event
            </button>
          </Link>
          <DeleteAlertBox id={eventIdData?.id as string} />
        </>
      )}
      <div>
        <form action={registerEventWithId}>
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            Register Event
          </button>
        </form>
      </div>
    </section>
  );
};

export default EventId;
