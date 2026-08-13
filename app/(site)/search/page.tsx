"use client";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ search --query</p>
      <div className="flex items-center border border-border rounded px-3 py-2 font-mono text-sm">
        <span className="text-accent mr-2">{">"}</span>
        <input
          className="bg-transparent outline-none flex-1 text-gray-200"
          placeholder="search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="animate-pulse">_</span>
      </div>
      {/* Wire this up to lib/search/index.ts (Fuse.js) client-side */}
    </div>
  );
}
