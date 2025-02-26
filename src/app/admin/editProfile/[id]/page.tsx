import prisma from "@/databases/db";
import EditUserForm from "@/features/admin/components/EditUserForm";

type ParamProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProfile({ params }: ParamProps) {
  const { id } = await params;

  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <EditUserForm initialData={data} />
    </>
  );
}
