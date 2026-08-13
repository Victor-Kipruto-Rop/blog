import fs from "fs";
import path from "path";
import { parseMDX, ParsedPost } from "./parse";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostSummary extends ParsedPost {
  slug: string;
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const parsed = parseMDX(raw);
      return { ...parsed, slug: file.replace(/\.mdx$/, "") };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostSummary | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return { ...parseMDX(raw), slug };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

export function getPostsByTag(tag: string): PostSummary[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}
