"use client";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-black"
    >
      Log Out
    </button>
  );
}
