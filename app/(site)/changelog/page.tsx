export const metadata = { title: "Changelog", description: "Product and publishing updates for the engineering journal." };

export default function ChangelogPage() {
  return (
    <div>
      <p className="eyebrow">Changelog</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Changes worth recording.</h1>
      <p className="mt-4 max-w-2xl text-muted">This log will contain verified publication and platform changes. Release entries are added when a change ships, rather than generated from placeholder dates.</p>
      <div className="content-panel mt-8">
        <p className="post-meta">EDITORIAL POLICY</p>
        <p className="mt-2 text-muted">Content updates, major features, and infrastructure changes will be recorded here with their actual release dates.</p>
      </div>
    </div>
  );
}
