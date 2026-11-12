import { getAllPosts } from "@/lib/content-engine/registry";
import PostCard from "@/components/post-card";

export const metadata = { title: "Articles", description: "All engineering articles and field notes by Victor Kipruto Rop." };

export default function PostsIndex() {
  const posts = getAllPosts();
  return (
    <div>
      <p className="eyebrow">The archive</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Articles & field notes</h1>
      <p className="mt-4 max-w-2xl text-muted">A growing collection of practical writing on data engineering, fintech infrastructure, cloud systems and software architecture.</p>
      <p className="mt-6 post-meta">{posts.length} {posts.length === 1 ? "ARTICLE" : "ARTICLES"} · NEW WRITING ADDED AS IT IS REVIEWED</p>
      <div className="post-grid mt-8">
        {posts.map((post) => <PostCard key={post.slug} slug={post.slug} title={post.title} date={post.date} tags={post.tags} readingTime={post.readingTime} />)}
      </div>
    </div>
  );
}
