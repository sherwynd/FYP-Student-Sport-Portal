import Link from "next/link";

export default function NavBar() {
  const links = [
    { title: "Home", url: "/" },
    { title: "Event", url: "/event" },
    { title: "Profile", url: "/profile" },
    { title: "Admin", url: "/admin" },
    { title: "Login", url: "/login" },
    { title: "Register", url: "/register" },
  ];

  return (
    <nav className="flex min-h-[40px] items-center justify-center bg-black text-white">
      <div className="flex space-x-4">
        {links.map(({ title, url }, index) => (
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
