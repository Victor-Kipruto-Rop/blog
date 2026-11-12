import { Feed } from "feed";
import { getAllPosts } from "@/lib/content-engine/registry";

const SITE_URL = process.env.SITE_URL || "https://blog.victorkipruto.com";

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: "Victor Kipruto Rop | Engineering Notes",
    description: "Engineering notes on data platforms, fintech infrastructure and distributed systems.",
    id: SITE_URL,
    link: SITE_URL,
    language: "en-KE",
    copyright: `© ${new Date().getFullYear()} Victor Kipruto Rop`,
    author: { name: "Victor Kipruto Rop", link: "https://www.victorkipruto.com" }
  });

  posts.forEach((post) => {
    const description = post.content.replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 300);
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/posts/${post.slug}`,
      link: `${SITE_URL}/posts/${post.slug}`,
      description,
      date: new Date(post.date),
      category: post.tags.map((name) => ({ name }))
    });
  });

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300, stale-while-revalidate=1800" }
  });
}
