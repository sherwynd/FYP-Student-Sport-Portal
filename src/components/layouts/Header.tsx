import Image from "next/image";

export default function Header() {
  return (
    <header className="grid gap-4 bg-sky-300 md:grid-cols-3">
      <Image
        src="/HeaderLogo.png"
        width={80}
        height={80}
        alt=""
        className="m-2"
      />
      <h1 className="">Student Sport Portal</h1>
    </header>
  );
}
