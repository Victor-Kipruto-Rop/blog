"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SearchResult = { slug: string; title: string; date: string; tags: string[]; readingTime: string; excerpt: string };

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (!term) { setResults([]); setSearched(false); setLoading(false); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Search request failed");
        const data = await response.json();
        setResults(data.results ?? []);
        setSearched(true);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  return (
    <div>
      <p className="eyebrow">Find something useful</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Search the journal</h1>
      <p className="mt-4 max-w-xl text-muted">Search article titles, topics and the full text of published notes.</p>
      <label className="mt-8 block">
        <span className="sr-only">Search articles</span>
        <input className="search-input" type="search" placeholder="Try “Kafka”, “M-Pesa” or “data quality”…" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
      </label>
      <div className="mt-5 flex items-center justify-between post-meta">
        <span>{loading ? "SEARCHING…" : searched ? `${results.length} MATCHES` : "TYPE TO SEARCH"}</span>
        {query && <button className="text-accent" type="button" onClick={() => setQuery("")}>Clear</button>}
      </div>
      <div className="mt-5 grid gap-3">
        {results.map((result) => (
          <Link key={result.slug} href={`/posts/${result.slug}`} className="content-panel transition-colors hover:border-[var(--accent)]">
            <p className="post-meta">{result.date} · {result.readingTime}</p>
            <h2 className="mt-2 font-display text-2xl">{result.title}</h2>
            <p className="mt-2 text-sm text-muted">{result.excerpt}</p>
            <p className="mt-3 font-mono text-xs text-accent">{result.tags.map((tag) => `#${tag}`).join("  ")}</p>
          </Link>
        ))}
        {searched && !loading && results.length === 0 && <p className="content-panel text-muted">No articles matched that search. Try a broader topic.</p>}
      </div>
    </div>
  );
}
