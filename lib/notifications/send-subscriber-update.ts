// Triggered on publish — wire to Resend/Buttondown
export async function sendSubscriberUpdate(postTitle: string, postUrl: string) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey) {
    console.warn("EMAIL_PROVIDER_API_KEY not set — skipping subscriber notification.");
    return;
  }
  // TODO: call email provider's API with postTitle/postUrl
}
