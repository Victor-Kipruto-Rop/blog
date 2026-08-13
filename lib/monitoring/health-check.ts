// [v2] Basic health check — extend with real build/deploy status lookups
export async function getSystemHealth() {
  return {
    uptime: "99.98%",
    buildStatus: "passing",
    lastDeploy: new Date().toISOString(),
  };
}
