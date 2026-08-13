import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/content-engine/registry";
import PostCard from "@/components/post-card";
import StatusBadge from "@/components/status-badge";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const tags = getAllTags();

  return (
    <div className="space-y-lg">
      <section className="rounded-lg border border-rule bg-card p-lg shadow-lg">
        <div className="space-y-lg">
          <div className="flex flex-wrap items-center gap-md text-xs font-mono uppercase tracking-wider text-accent">
            <StatusBadge />
            <span>// SYSTEM ONLINE · 2026</span>
          </div>
          <div className="space-y-md">
            <h1 className="text-4xl sm:text-5xl font-display font-semibold leading-tight text-ink">
              Engineering data systems for fintech and East African infrastructure.
            </h1>
            <p className="max-w-2xl text-muted">
              A premium log for data engineering, fintech infrastructure, and systems design — written with clarity, restraint, and technical rigor.
            </p>
          </div>
          <div className="flex flex-wrap gap-md">
            <Link
              href={latestPost ? `/posts/${latestPost.slug}` : "/posts"}
              className="rounded-base bg-accent px-lg py-md text-sm font-semibold text-white transition-all hover:bg-accent-hover"
            >
              Read latest post
            </Link>
            <Link
              href="/readme"
              className="rounded-base border border-rule bg-transparent px-lg py-md text-sm font-semibold text-ink transition-all hover:border-accent hover:text-accent"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </section>

      {latestPost ? (
        <section className="rounded-lg border border-rule bg-card p-lg">
          <div className="space-y-md">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">// LATEST POST</p>
            <Link href={`/posts/${latestPost.slug}`} className="text-3xl font-semibold text-ink hover:text-accent transition-colors">
              {latestPost.title}
            </Link>
            <p className="max-w-2xl text-muted">
              {latestPost.content.split("\n").find((line) => line.trim()) ?? "A new post from DataForge Log."}
            </p>
            <div className="flex flex-wrap gap-md items-center text-xs font-mono text-muted">
              <span>{latestPost.date}</span>
              <span>·</span>
              <span>{latestPost.readingTime}</span>
              <div className="flex flex-wrap gap-sm">
                {latestPost.tags.map((tag) => (
                  <span key={tag} className="rounded-sm border border-rule px-sm py-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-lg lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-rule bg-card p-lg">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">// ALL POSTS</p>
          <div className="mt-lg space-y-md">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                tags={post.tags}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-rule bg-card p-lg">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">// TAGS</p>
          <div className="mt-lg flex flex-wrap gap-sm">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-sm border border-rule bg-transparent px-md py-sm text-xs text-ink transition-all hover:border-accent hover:text-accent"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
