"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("vkr-blog-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = saved ? saved === "dark" : prefersDark;
    document.body.classList.toggle("dark-mode", enabled);
    setDark(enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.body.classList.toggle("dark-mode", next);
    window.localStorage.setItem("vkr-blog-theme", next ? "dark" : "light");
    setDark(next);
  }

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
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Light theme" : "Dark theme"}>
            {dark ? "☼" : "◐"}
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
}
