import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content-engine/registry";

const SITE_URL = process.env.SITE_URL || "https://example.com";

function summarize(content: string) {
  const firstText = content
    .split("\n")
    .find((line) => line.trim() && !line.startsWith("#"));
  return firstText ? firstText.trim().slice(0, 160) : "A technical log for data engineering and fintech infrastructure.";
}

function buildStructuredData(post: ReturnType<typeof getPostBySlug> & { slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: summarize(post.content),
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Victor Kipruto Rop",
    },
    publisher: {
      "@type": "Organization",
      name: "DataForge Log",
    },
    url: `${SITE_URL}/posts/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/posts/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found | DataForge Log",
      description: "The requested post could not be found.",
    };
  }

  const description = summarize(post.content);
  const pageUrl = `${SITE_URL}/posts/${post.slug}`;

  return {
    title: `${post.title} | DataForge Log`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: pageUrl,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const structuredData = buildStructuredData(post as ReturnType<typeof getPostBySlug> & { slug: string });

  return (
    <article className="space-y-lg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="space-y-md">
        <div className="flex flex-wrap items-center gap-md text-xs font-mono text-muted">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          <div className="flex flex-wrap gap-sm">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-sm border border-rule px-sm py-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-4xl font-display font-semibold text-ink">{post.title}</h1>
        <div className="prose-invert max-w-none whitespace-pre-line text-muted">{post.content}</div>
        <div className="flex flex-wrap gap-md pt-lg text-sm text-accent">
          <Link href="/posts" className="hover:underline">
            ← Back to posts
          </Link>
        </div>
      </div>
    </article>
  );
}
