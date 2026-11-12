import { NextResponse } from "next/server";

export const runtime = "nodejs";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API = "https://api.resend.com";

async function resend(path: string, apiKey: string, body: unknown) {
  return fetch(`${RESEND_API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store"
  });
}

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
    return NextResponse.json({ error: "Please consent to receive article notifications." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !audienceId || !from) {
    return NextResponse.json({ error: "Email subscriptions are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  let contactResponse: Response;
  try {
    contactResponse = await resend(`/audiences/${encodeURIComponent(audienceId)}/contacts`, apiKey, {
      email,
      unsubscribed: false
    });
  } catch {
    return NextResponse.json({ error: "The email provider could not be reached. Please try again." }, { status: 502 });
  }

  if (!contactResponse.ok && contactResponse.status !== 409) {
    return NextResponse.json({ error: "We could not save your subscription. Please try again." }, { status: 502 });
  }

  const alreadySubscribed = contactResponse.status === 409;
  if (alreadySubscribed) {
    return NextResponse.json({ status: "already_subscribed" });
  }

  const welcome = await resend("/emails", apiKey, {
    from,
    to: [email],
    subject: "You're subscribed to Victor's Engineering Notes",
    html: "<p>Thanks for subscribing to Victor Kipruto Rop's Engineering Notes.</p><p>You'll receive occasional notifications when a new article is published. You can unsubscribe using the link in any newsletter email.</p><p><a href=\"https://blog.victorkipruto.com\">Visit Engineering Notes</a></p>",
    text: "Thanks for subscribing to Victor Kipruto Rop's Engineering Notes. You'll receive occasional notifications when a new article is published. Visit https://blog.victorkipruto.com"
  }).catch(() => null);

  if (!welcome?.ok) {
    return NextResponse.json({ status: "subscribed_email_pending", message: "Your address was saved, but the welcome email could not be sent yet." }, { status: 202 });
  }
  return NextResponse.json({ status: "subscribed" }, { status: 201 });
}
