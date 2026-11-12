import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export default function PostCard({ slug, title, date, tags, readingTime }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-meta">{date} <span aria-hidden="true">·</span> {readingTime}</div>
      <h2><Link href={`/posts/${slug}`}>{title}</Link></h2>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {tags.slice(0, 3).map((tag) => <Link key={tag} className="tag-pill" href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>)}
      </div>
      <Link className="mt-5 inline-flex font-mono text-xs text-accent" href={`/posts/${slug}`}>Read article ↗</Link>
    </article>
  );
}
