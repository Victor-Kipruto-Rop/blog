import "./globals.css";
import NavCLI from "@/components/nav-cli";

const siteUrl = process.env.SITE_URL || "https://example.com";

export const metadata = {
  title: "DataForge // Blog System",
  description: "A premium engineering blog for data engineering, fintech infrastructure, and East African tech.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "DataForge // Blog System",
    description: "A premium engineering blog for data engineering, fintech infrastructure, and East African tech.",
    type: "website",
    siteName: "DataForge Log",
    images: ["/api/og?title=DataForge%20Log"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-sans min-h-screen">
        <NavCLI />
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
