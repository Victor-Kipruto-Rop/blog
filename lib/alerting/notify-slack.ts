// [v2] Fires alerts to Slack/Discord webhook on build failures, broken links, feed errors
export async function notifySlack(message: string) {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("ALERT_WEBHOOK_URL not set — skipping alert:", message);
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
}
