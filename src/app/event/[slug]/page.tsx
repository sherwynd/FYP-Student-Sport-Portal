import prisma from "@/databases/db";

type TParams = {
  params: {
    slug: string;
  };
};
export default async function EventId({ params }: TParams) {
  const eventIdData = await prisma.template.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <main>
      Event ID Page is
      <p>{eventIdData?.title}</p>
      <p>{eventIdData?.body}</p>
    </main>
  );
}
