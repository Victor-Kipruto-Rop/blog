import { NextResponse } from "next/server";
import { searchPosts } from "@/lib/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const results = searchPosts(q);
  return NextResponse.json({ results });
}
