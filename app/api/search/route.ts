import { NextResponse } from "next/server";
import { searchPosts } from "@/lib/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") || "").trim().slice(0, 120);
  if (query.length < 2) return NextResponse.json({ results: [] });

  const results = searchPosts(query).slice(0, 20).map((post) => {
    const plain = post.content.replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim();
    return {
      slug: post.slug,
      title: post.title,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
      excerpt: plain.slice(0, 220)
    };
  });
  return NextResponse.json({ results }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
