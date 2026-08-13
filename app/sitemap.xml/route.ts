import { getAllPosts } from "@/lib/content-engine/registry";

const SITE_URL = process.env.SITE_URL || "https://example.com";

export async function GET() {
  const posts = getAllPosts();
  const pages = ["", "posts", "tags", "search", "readme", "status", "changelog"];

  const urls = pages
    .map(
      (path) => `
    <url>
      <loc>${SITE_URL}/${path}</loc>
      <changefreq>weekly</changefreq>
    </url>`
    )
    .join("");

  const postUrls = posts
    .map(
      (post) => `
    <url>
      <loc>${SITE_URL}/posts/${post.slug}</loc>
      <lastmod>${post.date}</lastmod>
      <changefreq>monthly</changefreq>
    </url>`
  )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}${postUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
