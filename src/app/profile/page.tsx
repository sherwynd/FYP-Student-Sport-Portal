import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>
        <h1>Session Information:</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>

        <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
          <div className="w-96 rounded-lg bg-white p-6 text-center shadow-md">
            <div className="mb-4">
              <Image
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/profile-template.png"
                }
                alt="User Avatar"
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {session?.user?.name || "User Name"}
            </h2>
            <p className="text-gray-600">
              {session?.user?.email || "User Email"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
