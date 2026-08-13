// [v2] Private dashboard — gate behind auth middleware before deploying
export default function DashboardOverview() {
  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ dashboard --overview</p>
      <p className="text-gray-400">Post velocity, drafts, and event log summary go here.</p>
    </div>
  );
}
