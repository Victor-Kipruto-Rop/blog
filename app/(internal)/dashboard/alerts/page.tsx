// [v2] Reads from lib/monitoring/event-store.ts
export default function AlertsPage() {
  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ dashboard --alerts</p>
      <p className="text-gray-400">Alert history: build failures, broken links, feed errors.</p>
    </div>
  );
}
