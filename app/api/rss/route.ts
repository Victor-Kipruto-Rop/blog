import { Feed } from "feed";
import { getAllPosts } from "@/lib/content-engine/registry";

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: "DataForge Log",
    description: "Data engineering & fintech infrastructure notes.",
    id: "https://example.com/",
    link: "https://example.com/",
    copyright: "",
  });

  posts.forEach((p) =>
    feed.addItem({
      title: p.title,
      id: p.slug,
      link: `https://example.com/posts/${p.slug}`,
      date: new Date(p.date),
    })
  );

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml" },
  });
}
