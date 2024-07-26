export default function NavBar() {
  return (
    <nav className="flex justify-center bg-stone-900">
      {[
        ["Home", "/"],
        ["Event", "/event"],
        ["Profile", "/profile"],
        ["Admin", "/admin"],
        ["Login", "/login"],
        ["Register", "/register"],
      ].map(([title, url]) => (
        <a
          key={url}
          href={url}
          className="rounded-lg px-3 py-2 font-medium text-neutral-50 hover:bg-slate-100 hover:text-slate-900 hover:duration-300"
        >
          {title}
        </a>
      ))}
    </nav>
  );
}
