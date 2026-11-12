import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/content-engine/registry";
import PostCard from "@/components/post-card";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();
  return (
    <div>
      <Link href="/tags" className="font-mono text-xs text-accent">← All topics</Link>
      <p className="eyebrow mt-8">Topic archive</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">#{tag}</h1>
      <p className="mt-4 text-muted">{posts.length} {posts.length === 1 ? "article" : "articles"} in this topic.</p>
      <div className="post-grid mt-8">
        {posts.map((post) => <PostCard key={post.slug} slug={post.slug} title={post.title} date={post.date} tags={post.tags} readingTime={post.readingTime} />)}
      </div>
    </div>
  );
}
