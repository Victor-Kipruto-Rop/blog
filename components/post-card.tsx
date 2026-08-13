interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export default function PostCard({ slug, title, date, tags, readingTime }: PostCardProps) {
  return (
    <a href={`/posts/${slug}`} className="block border border-rule rounded-base bg-card p-lg hover:border-accent hover:shadow-md transition-all">
      <p className="font-mono text-xs text-muted mb-sm">
        [{date}] :: {readingTime} :: {tags.map((t) => `#${t}`).join(" ")}
      </p>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
    </a>
  );
}
