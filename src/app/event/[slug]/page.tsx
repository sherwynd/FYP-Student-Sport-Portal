import prisma from "@/databases/db";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { verifySession } from "@/libs/dal";
import DeleteAlertBox from "@/features/event/components/DeleteAlertBox";
import RegisterServiceButton from "@/features/event/components/RegisterServiceButton";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EventId = async ({ params }: ParamProps) => {
  const currentUser = await verifySession();

  const eventIdData = await prisma.event.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      eventImage: true,
      eventCertificate: true,
    },
  });

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
            src="/default-event-template.jpg"
            width={800}
            height={200}
            alt="Picture of the event image"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Admin Actions */}
      {(currentUser?.role === "admin" || "organizer") && (
        <div className="flex w-full max-w-4xl justify-between px-4 py-6">
          <Link href={`/event/editEvent/${eventIdData?.id}`}>
            <button className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
              Edit Event
            </button>
          </Link>
          <DeleteAlertBox id={eventIdData?.id as string} />
        </div>
      )}

      {/* Title & Description */}
      <div className="w-full max-w-4xl px-4 pb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {eventIdData?.title}
        </h1>
        <p className="mt-2 text-gray-600">{eventIdData?.description}</p>
      </div>

      {/* Details Section */}
      <div className="w-full max-w-4xl space-y-4 px-4 py-6">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="flex justify-center text-lg font-semibold text-gray-700">
            Event Course Hour
          </h2>
          <p className="flex justify-center text-gray-600">
            {eventIdData?.creditHour || "No credit hours provided"}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="flex justify-center text-lg font-semibold text-gray-700">
            The Course
          </h2>
          <p className="flex justify-center text-gray-600">
            {eventIdData?.courseLevel || "No course level specified"}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="flex justify-center text-lg font-semibold text-gray-700">
            Certificate You Receive
          </h2>
          <p className="flex justify-center text-gray-600">
            {eventIdData?.eventCertificate?.filename ||
              "No certificate provided"}
          </p>
        </div>
        {eventIdData?.numberOfPeople && eventIdData?.numberOfPeople > 0 ? (
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="flex justify-center text-lg font-semibold text-gray-700">
              Service Required
            </h2>
            <p className="flex justify-center text-gray-600">
              {`Number of People: ${eventIdData.numberOfPeople}`}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Action Buttons */}
      <RegisterServiceButton
        userId={String(currentUser?.userId ?? "")}
        eventId={eventIdData?.id ?? ""}
        numberOfPeople={eventIdData?.numberOfPeople ?? 0}
      />
    </section>
  );
};

export default EventId;
