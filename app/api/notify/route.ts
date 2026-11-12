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
  let payload: { slugs?: string[] };
  try { payload = await req.json(); }
  catch { return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 }); }

  const slugs = Array.isArray(payload.slugs) ? [...new Set(payload.slugs)] : [];
  if (!slugs.length || slugs.length > 10 || slugs.some((slug) => typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
    return NextResponse.json({ error: "Provide between one and ten valid published article slugs." }, { status: 400 });
  }
  const posts = slugs.map((slug) => getPostBySlug(slug));
  if (posts.some((post) => !post)) {
    return NextResponse.json({ error: "One or more articles are not published." }, { status: 404 });
  }
  const published = posts.filter((post): post is NonNullable<typeof post> => post !== null);
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !audienceId || !from) {
    return NextResponse.json({ error: "Newsletter delivery is not configured." }, { status: 503 });
  }

  const items = published.map((post) => {
    const url = `${SITE_URL}/posts/${post.slug}`;
    const excerpt = post.content.replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 260);
    return { title: post.title, url, excerpt };
  });
  const subject = items.length === 1 ? `New article: ${items[0].title}` : `${items.length} new engineering notes`;
  const htmlItems = items.map((item) => `<article style="padding:16px 0;border-bottom:1px solid #eee"><h2 style="font-size:20px"><a href="${item.url}" style="color:#bd4b2c;text-decoration:none">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.excerpt)}</p><p><a href="${item.url}">Read article →</a></p></article>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#25221f;max-width:620px;margin:auto"><p style="color:#bd4b2c;font-size:12px;letter-spacing:2px;text-transform:uppercase">Victor Kipruto Rop · Engineering Notes</p><h1>${items.length === 1 ? "A new article is out" : "New engineering notes"}</h1>${htmlItems}<p style="font-size:12px;color:#777">You are receiving this because you subscribed to article notifications. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p></div>`;
  const text = items.map((item) => `${item.title}\n${item.excerpt}\nRead: ${item.url}`).join("\n\n") + "\n\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}";
  const idempotencyKey = `blog-publish-${[...slugs].sort().join("-")}`.slice(0, 240);

  try {
    const created = await fetch("https://api.resend.com/broadcasts", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify({ audience_id: audienceId, from, subject, html, text }),
      cache: "no-store"
    });
    const broadcast = await created.json();
    if (!created.ok || !broadcast.id) {
      return NextResponse.json({ error: "The email provider could not create the notification." }, { status: 502 });
    }
    const sent = await fetch(`https://api.resend.com/broadcasts/${encodeURIComponent(broadcast.id)}/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `${idempotencyKey}-send` },
      cache: "no-store"
    });
    if (!sent.ok) {
      return NextResponse.json({ error: "The notification was created but could not be sent.", broadcastId: broadcast.id }, { status: 502 });
    }
    return NextResponse.json({ status: "sent", broadcastId: broadcast.id, count: published.length }, { status: 202 });
  } catch {
    return NextResponse.json({ error: "The email provider could not be reached." }, { status: 502 });
  }
}
