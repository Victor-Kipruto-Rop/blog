import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/posts", label: "posts" },
  { href: "/tags", label: "tags" },
  { href: "/search", label: "search" },
  { href: "/readme", label: "readme" },
  { href: "/status", label: "status" },
  { href: "/changelog", label: "changelog" },
];

export default function NavCLI() {
  return (
    <nav className="border-b border-rule">
      <div className="max-w-3xl mx-auto px-4 py-3 flex gap-4 font-mono text-sm overflow-x-auto">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-muted hover:text-accent transition-colors whitespace-nowrap">
            {"> "}
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
