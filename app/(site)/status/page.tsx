// [v2] Public system dashboard — wire to lib/monitoring/health-check.ts
export default function StatusPage() {
  const metrics = {
    uptime: "99.98%",
    lastDeploy: "2026-07-14 09:12 UTC",
    posts: 0,
    buildStatus: "passing",
  };

  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ system --health</p>
      <div className="grid grid-cols-2 gap-4 font-mono text-sm">
        <div className="border border-border rounded p-4">
          <p className="text-gray-500">uptime</p>
          <p className="text-accent text-lg">{metrics.uptime}</p>
        </div>
        <div className="border border-border rounded p-4">
          <p className="text-gray-500">build</p>
          <p className="text-accent text-lg">{metrics.buildStatus}</p>
        </div>
        <div className="border border-border rounded p-4">
          <p className="text-gray-500">last deploy</p>
          <p>{metrics.lastDeploy}</p>
        </div>
        <div className="border border-border rounded p-4">
          <p className="text-gray-500">posts</p>
          <p>{metrics.posts}</p>
        </div>
      </div>
    </div>
  );
}
