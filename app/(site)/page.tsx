import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/content-engine/registry";
import PostCard from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const latestPost = posts[0];

  return (
    <div>
      <section className="hero-panel">
        <p className="eyebrow">Independent engineering journal · Nairobi, Kenya</p>
        <h1 className="hero-title">Building systems that <em>move data</em> and move ideas forward.</h1>
        <p className="hero-description">
          Practical notes from the work of engineering data platforms, dependable fintech infrastructure,
          distributed systems and software that solves real problems.
        </p>
        <div className="button-row">
          <Link href={latestPost ? `/posts/${latestPost.slug}` : "/posts"} className="button-primary">Read the latest article ↗</Link>
          <Link href="/readme" className="button-secondary">About this journal</Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-xs font-mono text-muted">
          <span>01 / DATA ENGINEERING</span>
          <span>02 / FINTECH SYSTEMS</span>
          <span>03 / CLOUD & DISTRIBUTED SYSTEMS</span>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">The notebook</p>
            <h2>Latest writing</h2>
          </div>
          <Link href="/posts" className="font-mono text-xs text-accent">Browse all articles ↗</Link>
        </div>
        {posts.length ? (
          <div className="post-grid">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post.slug} slug={post.slug} title={post.title} date={post.date}
                tags={post.tags} readingTime={post.readingTime} />
            ))}
          </div>
        ) : (
          <div className="content-panel text-muted">The next field notes are being prepared. Check back soon.</div>
        )}
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-[1.2fr_.8fr]">
        <div className="content-panel">
          <p className="eyebrow">What I write about</p>
          <h2 className="mt-3 font-display text-3xl">Engineering, with the trade-offs left in.</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">The goal is not to repeat documentation. It is to explain the decisions, failure modes and operational details that matter when systems meet production.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => <Link className="tag-pill" key={tag} href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>)}
          </div>
        </div>
        <div className="content-panel flex flex-col justify-between">
          <div>
            <p className="eyebrow">About the author</p>
            <h2 className="mt-3 font-display text-2xl">Victor Kipruto Rop</h2>
            <p className="mt-3 text-sm text-muted">Data Engineer and FinTech Infrastructure Builder. Interested in reliable data pipelines, payment systems, cloud infrastructure and thoughtful software engineering.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
            <a className="text-accent" href="https://www.victorkipruto.com">Portfolio ↗</a>
            <a className="text-accent" href="https://github.com/Victor-Kipruto-Rop">GitHub ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
