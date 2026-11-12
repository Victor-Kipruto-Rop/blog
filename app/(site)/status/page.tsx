import { getAllPosts } from "@/lib/content-engine/registry";

export const metadata = { title: "Publishing status", description: "How this engineering journal is built and maintained." };

export default function StatusPage() {
  const posts = getAllPosts();
  return (
    <div>
      <p className="eyebrow">Publishing status</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">A small, dependable publication.</h1>
      <p className="mt-4 max-w-2xl text-muted">This page describes the publishing setup. Live uptime monitoring and deployment telemetry have not been connected, so no availability percentage or incident history is claimed.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="content-panel"><p className="post-meta">CONTENT SOURCE</p><p className="mt-2 text-xl font-display">Git-backed MDX</p><p className="mt-2 text-sm text-muted">Articles are reviewed and version-controlled before publishing.</p></div>
        <div className="content-panel"><p className="post-meta">EDGE PLATFORM</p><p className="mt-2 text-xl font-display">Cloudflare Workers</p><p className="mt-2 text-sm text-muted">Production deployment health will be reported here once telemetry is wired.</p></div>
        <div className="content-panel"><p className="post-meta">PUBLISHED ARTICLES</p><p className="mt-2 text-3xl font-display">{posts.length}</p><p className="mt-2 text-sm text-muted">Count generated from the published content registry.</p></div>
        <div className="content-panel"><p className="post-meta">OBSERVABILITY</p><p className="mt-2 text-xl font-display">Not yet connected</p><p className="mt-2 text-sm text-muted">No synthetic uptime checks or incident-management integration is configured.</p></div>
      </div>
    </div>
  );
}
