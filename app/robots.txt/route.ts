const SITE_URL = process.env.SITE_URL || "https://blog.victorkipruto.com";

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /dashboard
Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" }
  });
}
