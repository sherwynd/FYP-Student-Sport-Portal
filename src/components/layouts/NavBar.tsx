import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";
export default async function NavBar() {
  const session = await getServerSession(authOptions);

  const adminLinks = [
    { title: "Home", url: "/" },
    { title: "Event", url: "/event" },
    { title: "Profile", url: "/profile" },
    { title: "Admin", url: "/admin" },
  ];

  const links = [
    { title: "Home", url: "/" },
    { title: "Event", url: "/event" },
    { title: "Profile", url: "/profile" },
  ];

  return (
    <nav className="flex min-h-[40px] items-center justify-center bg-black text-white">
      <div className="flex space-x-4">
        {session?.user?.role === "admin"
          ? // If the user is logged in and is an admin
            adminLinks.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className="px-3 py-2 transition hover:text-gray-400"
              >
                {title}
              </Link>
            ))
          : // If the user is logged in but not an admin
            links.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className="px-3 py-2 transition hover:text-gray-400"
              >
                {title}
              </Link>
            ))}
      </div>
    </nav>
  );
}
