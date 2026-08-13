import Link from "next/link";
import { getAllTags } from "@/lib/content-engine/registry";

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div>
      <p className="font-mono text-accent text-sm mb-lg">// SYSTEM --LIST-TAGS</p>
      <div className="flex flex-wrap gap-md">
        {tags.map((t) => (
          <Link
            key={t}
            href={`/tags/${t}`}
            className="font-mono text-xs border border-rule px-md py-sm rounded-sm bg-card text-ink hover:border-accent hover:text-accent transition-all"
          >
            #{t}
          </Link>
        ))}
      </div>
    </div>
  );
}
