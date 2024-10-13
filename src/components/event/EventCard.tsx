import Image from "next/image";
import Link from "next/link";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";

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
        <CardBody>
          <Image
            src="/test-event-image.jpg"
            alt="test"
            width={800}
            height={200}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            {/* <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text> */}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {/* <div className="event-card max-w-sm overflow-hidden rounded-xl shadow-lg">
        <Link href={`event/${event.slug}`}>
          <Image
            src="/test-event-image.jpg"
            width={800}
            height={200}
            alt="Picture of the event image"
          />
          <div className="event-content p-3">
            <span className="event-course-level inline-block rounded-full bg-blue-200 px-2 text-xs font-semibold uppercase tracking-wide text-blue-800">
              {event.courseLevel}
            </span>
            <h2 className="event-title line-clamp-1 text-lg font-semibold">
              {event.title}
            </h2>
            <p className="event-description mt-2 line-clamp-1 text-sm text-gray-600">
              {event.description}
            </p>
            <div className="event-credit-hour mt-2 flex items-center">
              <span className="font-bold text-pink-500">●</span>
              <span className="ml-1 line-clamp-1 text-sm text-gray-600">
                Credit Hour : {event.creditHour}
              </span>
            </div>
            <p className="event-created-by-user mt-1 line-clamp-1 text-sm text-gray-600">
              Created by: user name
            </p>
            <button className="mt-4 rounded-full bg-yellow-500 px-4 py-2 text-white">
              Learn Now
            </button>
          </div>
        </Link>
      </div> */}
    </>
  );
}
