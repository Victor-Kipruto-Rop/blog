export default function StatusBadge({ ok = true }: { ok?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs">
      <span className={`w-2 h-2 rounded-full transition-all ${ok ? "bg-accent" : "bg-red-500"}`} />
      <span className={ok ? "text-accent" : "text-red-500"}>{ok ? "online" : "degraded"}</span>
    </span>
  );
}
