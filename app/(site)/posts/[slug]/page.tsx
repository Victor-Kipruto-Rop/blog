import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/content-engine/registry";

const SITE_URL = process.env.SITE_URL || "https://blog.victorkipruto.com";

function summarize(content: string) {
  return content.replace(/^---[\s\S]*?---/m, "").replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };
  const description = summarize(post.content);
  const url = `${SITE_URL}/posts/${post.slug}`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title, description, url, type: "article",
      publishedTime: post.date,
      authors: ["https://www.victorkipruto.com"],
      images: [{ url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630 }]
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [`${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`] }
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const description = summarize(post.content);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Victor Kipruto Rop", url: "https://www.victorkipruto.com" },
    publisher: { "@type": "Person", name: "Victor Kipruto Rop" },
    mainEntityOfPage: `${SITE_URL}/posts/${post.slug}`,
    keywords: post.tags
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Link href="/posts" className="font-mono text-xs text-accent">← All articles</Link>
      <header className="my-8">
        <p className="post-meta">{post.date} · {post.readingTime}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">{post.title}</h1>
        <div className="mt-5 tag-list">{post.tags.map((tag) => <Link className="tag-pill" key={tag} href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>)}</div>
      </header>
      <div className="content-panel">
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>
      </div>
      <footer className="mt-10 border-t border-rule pt-6">
        <p className="font-display text-2xl">Written by Victor Kipruto Rop</p>
        <p className="mt-2 text-sm text-muted">Data engineering · FinTech infrastructure · Systems architecture</p>
        <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs">
          <a className="text-accent" href="https://www.victorkipruto.com">Portfolio ↗</a>
          <a className="text-accent" href="https://github.com/Victor-Kipruto-Rop">GitHub ↗</a>
          <a className="text-accent" href="/api/rss">RSS ↗</a>
        </div>
      </footer>
    </article>
  );
}
