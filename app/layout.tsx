import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavCLI from "@/components/nav-cli";
import NewsletterForm from "@/components/newsletter-form";

const siteUrl = process.env.SITE_URL || "https://blog.victorkipruto.com";
const description = "Engineering notes on data platforms, reliable fintech infrastructure, distributed systems and building technology in East Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Victor Kipruto Rop | Engineering Notes", template: "%s | Victor Kipruto Rop" },
  description,
  applicationName: "Victor Kipruto Rop Engineering Blog",
  authors: [{ name: "Victor Kipruto Rop", url: "https://www.victorkipruto.com" }],
  creator: "Victor Kipruto Rop",
  alternates: { canonical: "/", types: { "application/rss+xml": "/api/rss" } },
  openGraph: {
    title: "Victor Kipruto Rop | Engineering Notes", description, url: siteUrl,
    siteName: "Victor Kipruto Rop | Engineering Notes", locale: "en_KE", type: "website",
    images: [{ url: "/api/og?title=Engineering%20Notes", width: 1200, height: 630, alt: "Victor Kipruto Rop Engineering Notes" }]
  },
  twitter: { card: "summary_large_image", title: "Victor Kipruto Rop | Engineering Notes", description, images: ["/api/og?title=Engineering%20Notes"] },
  robots: { index: true, follow: true },
  category: "technology"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#f5f0e8" />
      </head>
      <body>
        <NavCLI />
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <NewsletterForm />
            <div className="footer-grid mt-10">
              <div className="footer-brand">
                <p className="footer-heading">Victor Kipruto Rop</p>
                <p className="footer-copy">Practical engineering notes on data platforms, fintech infrastructure, distributed systems and the decisions behind reliable software.</p>
              </div>
              <div>
                <p className="footer-heading">Explore</p>
                <div className="footer-links">
                  <Link href="/posts">All articles</Link>
                  <Link href="/tags">Topics</Link>
                  <Link href="/readme">About this blog</Link>
                  <Link href="/api/rss">RSS feed</Link>
                </div>
              </div>
              <div>
                <p className="footer-heading">Elsewhere</p>
                <div className="footer-links">
                  <a href="https://www.victorkipruto.com">Portfolio</a>
                  <a href="https://github.com/Victor-Kipruto-Rop">GitHub</a>
                  <a href="https://www.linkedin.com/in/victor-kipruto-rop/">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">© {new Date().getFullYear()} Victor Kipruto Rop · Built for the long run.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
