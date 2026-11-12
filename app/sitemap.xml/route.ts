import { getAllPosts } from "@/lib/content-engine/registry";

const SITE_URL = process.env.SITE_URL || "https://blog.victorkipruto.com";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const pages = ["", "posts", "tags", "search", "readme"];
  const pageUrls = pages.map((path) => `<url><loc>${SITE_URL}${path ? `/${path}` : ""}</loc><changefreq>weekly</changefreq></url>`).join("");
  const postUrls = posts.map((post) => `<url><loc>${SITE_URL}/posts/${escapeXml(post.slug)}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pageUrls}${postUrls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
