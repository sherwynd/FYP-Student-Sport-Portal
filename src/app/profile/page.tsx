// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@api/auth/[...nextauth]/options";

export default async function Profile() {
  const session = await getServerSession(options);
  console.log("Session Data:", session);

  // const session = await auth();
  // if (!session) redirect("/login");
  // const user = session?.user;
  return (
    <>
      <div>
        <h1>Session Information:</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>{" "}
        {/* Render session data in a readable format */}
      </div>
    </>
  );
}
