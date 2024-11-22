import Link from "next/link";
import Image from "next/image";
import { Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";

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
      <Card maxW="sm">
        <Link href={`event/${event.slug}`}>
          <CardBody>
            <Image
              src="/test-event-image.jpg"
              width={800}
              height={200}
              alt="Picture of the event image"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{event.title}</Heading>
              <Text fontSize="md">{event.description}</Text>
              <Text fontSize="sm">Credit Hour : {event.creditHour}</Text>
            </Stack>
          </CardBody>
        </Link>
      </Card>
    </>
  );
}
