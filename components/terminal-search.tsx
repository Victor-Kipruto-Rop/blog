"use client";
import { useState } from "react";

export default function TerminalSearch({ onQuery }: { onQuery: (q: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center border border-border rounded px-3 py-2 font-mono text-sm">
      <span className="text-accent mr-2">{">"}</span>
      <input
        className="bg-transparent outline-none flex-1 text-gray-200"
        placeholder="search posts..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onQuery(e.target.value);
        }}
      />
    </div>
  );
}
