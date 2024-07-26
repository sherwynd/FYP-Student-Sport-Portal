import prisma from "@/databases/db";
import Link from "next/link";

type TEvent = {
  id: string;
  slug: string;
  title: string;
};

export default async function Event() {
  const eventData = await prisma.event.findMany();

  return (
    <main className="mx-4">
      <h2>Hello Event</h2>
      <Link href={`event/createEvent`}>Create Event</Link>
      <ul>
        {eventData.map((data: TEvent, index: number) => (
          <li className="mx-4 my-1" key={data.id}>
            <Link href={`event/${data.slug}`} key={index}>
              {data.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
