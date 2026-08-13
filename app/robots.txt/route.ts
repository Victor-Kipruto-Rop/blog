const SITE_URL = process.env.SITE_URL || "https://example.com";

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
