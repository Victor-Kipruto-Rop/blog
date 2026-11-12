import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: { email?: string; consent?: boolean; website?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 });
  }

  if (payload.website) return NextResponse.json({ status: "received" });
  const email = (payload.email || "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (payload.consent !== true) {
    return NextResponse.json({ error: "Explicit consent is required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: "Newsletter subscriptions are not configured yet." }, { status: 503 });
  }

  const response = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false })
  });

  if (response.status === 409) {
    return NextResponse.json({ status: "already_subscribed" });
  }
  if (!response.ok) {
    return NextResponse.json({ error: "The subscription provider could not complete the request." }, { status: 502 });
  }
  return NextResponse.json({ status: "subscribed" }, { status: 201 });
}
