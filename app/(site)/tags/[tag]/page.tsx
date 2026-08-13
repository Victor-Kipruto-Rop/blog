import Link from "next/link";
import { getPostsByTag } from "@/lib/content-engine/registry";
import PostCard from "@/components/post-card";

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);
  return (
    <div className="space-y-lg">
      <p className="font-mono text-accent text-sm">// GREP -R "#{params.tag}" POSTS/</p>
      <div className="space-y-md">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            date={p.date}
            tags={p.tags}
            readingTime={p.readingTime}
          />
        ))}
      </div>
    </div>
  );
}
