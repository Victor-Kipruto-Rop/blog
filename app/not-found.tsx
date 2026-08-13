import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-lg border border-rule bg-card p-lg text-center shadow-lg">
        <p className="font-mono text-sm uppercase tracking-wider text-accent">// 404</p>
        <h1 className="mt-lg text-4xl font-display font-semibold text-ink">route_not_found</h1>
        <p className="mt-md text-muted">
          The system could not locate that page. Return to the log or explore recent entries.
        </p>
        <div className="mt-lg flex flex-wrap justify-center gap-md">
          <Link href="/" className="rounded-base border border-rule bg-transparent px-lg py-md text-sm text-ink transition-all hover:border-accent hover:text-accent">
            Home
          </Link>
          <Link href="/posts" className="rounded-base bg-accent px-lg py-md text-sm font-semibold text-white transition-all hover:bg-accent-hover">
            Browse posts
          </Link>
        </div>
      </div>
    </div>
  );
}
