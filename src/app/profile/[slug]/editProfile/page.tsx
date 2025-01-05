import prisma from "@/databases/db";
import HandleProfileForm from "@/features/auth/components/HandleProfileForm";
import { verifySession } from "@/libs/dal";

// import prisma from "@/databases/db";
import { getProfileDTO } from "@/libs/dto";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

const EditProfile = async ({ params }: ParamProps) => {
  const currentUser = await verifySession();
  const { slug } = await params;
  const profileData = await getProfileDTO(slug, currentUser?.userId as String);

  const data = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      slug: true,
      userDetail: true,
    },
  });

  return (
    <>
      {profileData.canEdit ? (
        <div className="user-data-table-container">
          <HandleProfileForm userData={data} />
        </div>
      ) : (
        <>Unauthorized access to user detail edit.</>
      )}
    </>
  );
};

export default EditProfile;
