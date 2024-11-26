import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";
import LogOutButton from "@components/layouts/LogOutButton";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-full bg-blue-300">
      {/* Wrapper for 1440px constraint */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Image
            src="/HeaderLogo.png"
            width={80}
            height={80}
            alt="Logo"
            className="m-2"
            priority={true}
          />
          <h1 className="text-xl font-bold">Student Sport Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <LogOutButton />
          ) : (
            <Link href="/login">
              <button className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
