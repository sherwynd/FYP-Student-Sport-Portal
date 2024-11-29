import EventForm from "@/components/event/EventForm";
import prisma from "@/databases/db";

const EditEvent = async ({ params }: { params: { id: string } }) => {
  const eventIdData = await prisma.event.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!eventIdData) {
    return (
      <div>
        <h1>Event not found</h1>
        <p>The event you are trying to edit does not exist.</p>
      </div>
    );
  }

  return <EventForm actionType="Edit" initialData={eventIdData} />;
};

export default EditEvent;
