"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Articles" },
  { href: "/tags", label: "Topics" },
  { href: "/search", label: "Search" },
  { href: "/readme", label: "About" }
];

export default function NavCLI() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav-inner" aria-label="Main navigation">
        <Link href="/" className="site-brand" aria-label="Victor Kipruto Rop Engineering Notes home">
          <span className="site-brand-mark" aria-hidden="true">V</span>
          <span>
            <span className="site-brand-name">Victor Kipruto Rop</span>
            <span className="site-brand-caption">Engineering notes · Nairobi, KE</span>
          </span>
        </Link>
        <div className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="site-nav-actions">
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
}
