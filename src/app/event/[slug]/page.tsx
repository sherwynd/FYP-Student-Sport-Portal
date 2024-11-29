import prisma from "@/databases/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";
import DeleteAlertBox from "@/components/common/DeleteAlertBox";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventId = async ({ params }: ParamProps) => {
  const session = await getServerSession(authOptions);
  const eventIdData = await await prisma.event.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      image: true,
    },
  });

  return (
    <section className="flex flex-col items-center">
      {/* Image Section */}
      <div className="relative h-72 w-full bg-gray-200">
        {eventIdData?.image ? (
          <Image
            src={`data:${eventIdData.image.contentType};base64,${eventIdData.image.data.toString("base64")}`}
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
          <p className="text-gray-600">{eventIdData?.certificate || "N/A"}</p>
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
      {session?.user?.role === "admin" && (
        <>
          <Link href={`/event/editEvent/${eventIdData?.id}`}>
            <button className="mb-4 rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
              Edit Event
            </button>
          </Link>
          <DeleteAlertBox id={eventIdData?.id as string} />
        </>
      )}
    </section>
  );
};

export default EventId;
