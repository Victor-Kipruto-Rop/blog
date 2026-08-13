import { NextResponse } from "next/server";
import { getRecentEvents } from "@/lib/monitoring/event-store";

// [v2] Internal event log reader — powers dashboard/alerts
export async function GET() {
  return NextResponse.json({ events: getRecentEvents() });
}
