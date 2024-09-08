import Image from "next/image";

export default function Header() {
  return (
    <header className="grid items-center gap-4 bg-sky-300 md:grid-cols-3">
      <Image
        src="/HeaderLogo.png"
        width={80}
        height={80}
        alt=""
        className="m-2"
      />
      <h1 className="title-name text-center text-2xl">Student Sport Portal</h1>
    </header>
  );
}
