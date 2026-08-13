import { NextResponse } from "next/server";

// Wire to Resend / Buttondown. Treat this as the "subscribe to system events" endpoint.
export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }
  // TODO: call email provider API here
  return NextResponse.json({ status: "subscribed", email });
}
