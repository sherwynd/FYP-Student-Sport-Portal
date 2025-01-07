import prisma from "@/databases/db";

type ParamProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProfileId({ params }: ParamProps) {
  const { slug } = await params;

  const data = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
    select: {
      userDetail: true,
    },
  });

  const userDetail = data?.userDetail;

  function formatDate(date: Date | null | undefined): string {
    if (!(date instanceof Date)) return "";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Return the formatted date string
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold">
        Profile Information
      </h1>
      <div className="space-y-4">
        {/* Basic Info */}
        <div>
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <span className="font-bold">Gender: </span>
              {userDetail?.gender || ""}{" "}
            </div>
            <div>
              <span className="font-bold">Date of Birth: </span>{" "}
              {formatDate(userDetail?.dateOfBirth) || ""}
            </div>
            <div>
              <span className="font-bold">Age: </span> {userDetail?.age || ""}
              years
            </div>
            <div className="col-span-2">
              <span className="font-bold">Address: </span>{" "}
              {userDetail?.address || ""}
            </div>
          </div>
        </div>

        {/* Education Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Education </h2>
          <div className="mt-2 text-gray-600">
            <p>
              <span className="font-bold">University/School: </span>{" "}
              {userDetail?.university || ""}
            </p>
          </div>
        </div>

        {/* Physical Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Physical Details
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <span className="font-bold">Height: </span>{" "}
              {userDetail?.height || ""}
            </div>
            <div>
              <span className="font-bold">Weight: </span>{" "}
              {userDetail?.weight || ""}
            </div>
            <div>
              <span className="font-bold">Blood Type: </span>{" "}
              {userDetail?.bloodType}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
