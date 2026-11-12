import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/content-engine/registry";

export const runtime = "nodejs";
const SITE_URL = process.env.SITE_URL || "https://blog.victorkipruto.com";

function escapeHtml(value: string) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, (character) => entities[character] || character);
}

export async function POST(req: Request) {
  const secret = process.env.BLOG_NOTIFICATION_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: { slug?: string };
  try { payload = await req.json(); }
  catch { return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 }); }

  const slug = payload.slug || "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "A valid published article slug is required." }, { status: 400 });
  }
  const post = getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Published article not found." }, { status: 404 });

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !audienceId || !from) {
    return NextResponse.json({ error: "Newsletter delivery is not configured." }, { status: 503 });
  }

  const articleUrl = `${SITE_URL}/posts/${slug}`;
  const excerpt = post.content.replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 420);
  const subject = `New article: ${post.title}`;
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#25221f;max-width:620px;margin:auto"><p style="color:#bd4b2c;font-size:12px;letter-spacing:2px;text-transform:uppercase">Victor Kipruto Rop · Engineering Notes</p><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(excerpt)}</p><p><a href="${articleUrl}" style="display:inline-block;background:#bd4b2c;color:white;padding:12px 18px;text-decoration:none;border-radius:8px">Read the article</a></p><p style="font-size:12px;color:#777">You are receiving this because you subscribed to article notifications.</p></div>`;
  const text = `${post.title}\n\n${excerpt}\n\nRead: ${articleUrl}\n\nYou are receiving this because you subscribed to article notifications.`;

  try {
    const created = await fetch("https://api.resend.com/broadcasts", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `blog-post-${slug}` },
      body: JSON.stringify({ audience_id: audienceId, from, subject, html, text }),
      cache: "no-store"
    });
    const broadcast = await created.json();
    if (!created.ok || !broadcast.id) {
      return NextResponse.json({ error: "The email provider could not create the notification." }, { status: 502 });
    }
    const sent = await fetch(`https://api.resend.com/broadcasts/${encodeURIComponent(broadcast.id)}/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `blog-post-send-${slug}` },
      cache: "no-store"
    });
    if (!sent.ok) {
      return NextResponse.json({ error: "The notification was created but could not be sent.", broadcastId: broadcast.id }, { status: 502 });
    }
    return NextResponse.json({ status: "sent", broadcastId: broadcast.id, slug }, { status: 202 });
  } catch {
    return NextResponse.json({ error: "The email provider could not be reached." }, { status: 502 });
  }
}
