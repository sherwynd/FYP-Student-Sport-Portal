import Link from "next/link";

export default function Footer() {
  const links = [
    { title: "Privacy", pathname: "/" },
    { title: "Terms", pathname: "/" },
  ];
  return (
    <footer className="flex min-h-[40px] items-center justify-center bg-black text-white">
      <div className="flex space-x-4">
        {links.map(({ title, pathname }, index) => (
          <Link
            key={index}
            href={{ pathname }}
            className="px-3 py-2 transition hover:text-gray-400"
          >
            {title}
          </Link>
        ))}
      </div>
    </footer>
  );
}
