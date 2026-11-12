export const metadata = { title: "About", description: "About Victor Kipruto Rop and this engineering publication." };

export default function ReadmePage() {
  return (
    <article className="prose">
      <p className="eyebrow">About this publication</p>
      <h1>Engineering notes from the workbench.</h1>
      <p>This is the technical journal of <strong>Victor Kipruto Rop</strong>, a Data Engineer and FinTech Infrastructure Builder based in Nairobi, Kenya.</p>
      <p>I write about the practical work behind dependable data systems: ingestion, transformation, orchestration, streaming, reconciliation, observability, cloud infrastructure and software architecture.</p>
      <h2>What you will find here</h2>
      <ul>
        <li><strong>Data engineering:</strong> pipelines, warehouses, lakehouses, data quality and orchestration.</li>
        <li><strong>Fintech infrastructure:</strong> payment integrations, reconciliation, idempotency and operational reliability.</li>
        <li><strong>Distributed systems:</strong> queues, streaming, service boundaries, failure handling and scale.</li>
        <li><strong>Engineering practice:</strong> testing, deployment, maintainability and the trade-offs behind technical decisions.</li>
      </ul>
      <h2>Editorial approach</h2>
      <p>Articles should be useful, specific and honest about their limits. Implementation notes distinguish tested behavior from design proposals. Metrics are not invented, and external technical claims should link to primary documentation or reproducible evidence.</p>
      <h2>Elsewhere</h2>
      <ul>
        <li><a href="https://www.victorkipruto.com">Portfolio and projects</a></li>
        <li><a href="https://github.com/Victor-Kipruto-Rop">GitHub repositories</a></li>
        <li><a href="https://www.linkedin.com/in/victor-kipruto-rop/">LinkedIn profile</a></li>
      </ul>
      <p>For questions, corrections or collaboration, use the contact page on my portfolio.</p>
    </article>
  );
}
