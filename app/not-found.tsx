import Link from "next/link";

export default function NotFound() {
  return (
    <div className="content-panel mx-auto max-w-2xl py-16 text-center">
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">This page went off the map.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The address may have changed, or the page may no longer exist. Try the article archive instead.</p>
      <div className="button-row justify-center">
        <Link href="/" className="button-secondary">Back home</Link>
        <Link href="/posts" className="button-primary">Explore articles ↗</Link>
      </div>
    </div>
  );
}
