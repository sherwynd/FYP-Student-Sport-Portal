import Image from "next/image";
import Link from "next/link";
import { verifySession } from "@/libs/dal";
import { logout } from "@/features/auth/servers/logoutAction";

export default async function Header() {
  const session = await verifySession();
  return (
    <header className="w-full bg-[#041c2c]">
      {/* Wrapper for 1440px constraint */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Image
            src="/ISN_Primary_Logo.png"
            width={80}
            height={80}
            alt="Logo"
            className="m-2"
            priority={true}
          />
          <h1 className="text-xl font-bold text-white">SKS Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <form action={logout}>
              <button className="rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-black">
                Log Out
              </button>
            </form>
          ) : (
            <Link href="/auth/login">
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
