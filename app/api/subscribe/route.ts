import { NextResponse } from "next/server";

export const runtime = "nodejs";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: { email?: string; consent?: boolean; website?: string };
  try { payload = await req.json(); }
  catch { return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 }); }

  if (payload.website) return NextResponse.json({ status: "received" });
  const email = (payload.email || "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (payload.consent !== true) {
    return NextResponse.json({ error: "Please consent to receive article notifications." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: "Email subscriptions are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    const response = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        properties: { consent_source: "blog_subscription_form", consent_recorded_at: new Date().toISOString() }
      }),
      cache: "no-store"
    });

    if (response.status === 409) {
      return NextResponse.json({ status: "already_subscribed" });
    }
    if (!response.ok) {
      return NextResponse.json({ error: "We could not save your subscription. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ status: "subscribed" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The email provider could not be reached. Please try again." }, { status: 502 });
  }
}
