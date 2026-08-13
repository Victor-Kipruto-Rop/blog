// [v2] Site version history — populate from CHANGELOG.md or a data file
const entries = [
  { version: "v0.1.0", date: "2026-07-14", note: "Initial system scaffold." },
];

export default function ChangelogPage() {
  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ git log --oneline site/</p>
      <ul className="space-y-3 font-mono text-sm">
        {entries.map((e) => (
          <li key={e.version} className="border-l-2 border-border pl-3">
            <span className="text-accent">{e.version}</span>{" "}
            <span className="text-gray-500">{e.date}</span>
            <p className="text-gray-400">{e.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
