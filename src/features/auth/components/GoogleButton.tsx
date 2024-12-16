import Image from "next/image";

export default function GoogleButton() {
  return (
    <button className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
      <Image
        src="/icons8-google.svg"
        alt="Google"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <span>Google</span>
    </button>
  );
}
