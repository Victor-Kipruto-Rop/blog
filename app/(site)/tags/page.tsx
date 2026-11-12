import Link from "next/link";
import { getAllTags } from "@/lib/content-engine/registry";

export const metadata = { title: "Topics", description: "Browse engineering topics and article categories." };

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div>
      <p className="eyebrow">Browse by subject</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Topics</h1>
      <p className="mt-4 text-muted">Explore the subjects covered across the journal.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-pill px-4 py-2">#{tag}</Link>)}
      </div>
    </div>
  );
}
