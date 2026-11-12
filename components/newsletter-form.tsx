"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type State = "idle" | "submitting" | "success" | "already" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Subscription could not be completed.");
      if (data.status === "already_subscribed") {
        setState("already");
        setMessage("This address is already subscribed.");
      } else {
        setState("success");
        setMessage("You are subscribed. You will receive an email when a new article is published.");
        setEmail("");
        setConsent(false);
      }
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  return (
    <section className="content-panel mt-8" aria-labelledby="newsletter-heading">
      <p className="eyebrow">Field notes by email</p>
      <h2 id="newsletter-heading" className="mt-2 font-display text-2xl">Get the next engineering note.</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">Occasional articles on data engineering, fintech infrastructure and dependable software. No noise. Unsubscribe from any article notification.</p>
      <form onSubmit={submit} className="mt-5 flex max-w-xl flex-col gap-3">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" autoComplete="email" required maxLength={254}
          value={email} onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-accent" />
        <label className="flex items-start gap-2 text-xs text-muted">
          <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 accent-current" />
          <span>I agree to receive new article notifications by email. I can unsubscribe at any time.</span>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={state === "submitting"} className="button-primary disabled:cursor-not-allowed disabled:opacity-60">
            {state === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
          {message && <p role="status" aria-live="polite" className="text-xs text-muted">{message}</p>}
        </div>
      </form>
    </section>
  );
}
