import { NextResponse } from "next/server";
import { logEvent } from "@/lib/monitoring/event-store";

// [v2] CI/CD event receiver — point GitHub Actions webhook here
export async function POST(req: Request) {
  const payload = await req.json();
  logEvent("deploy", payload);
  return NextResponse.json({ received: true });
}
