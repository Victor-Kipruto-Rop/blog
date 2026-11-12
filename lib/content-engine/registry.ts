import fs from "fs";
import path from "path";
import { parseMDX, ParsedPost } from "./parse";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface PostSummary extends ParsedPost {
  slug: string;
}

function isPublished(raw: string) {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return true;
  return !/^\s*(draft|published)\s*:\s*(true|false)\s*$/m.test(frontmatter[1]) ||
    !/^\s*draft\s*:\s*true\s*$/m.test(frontmatter[1]) &&
    !/^\s*published\s*:\s*false\s*$/m.test(frontmatter[1]);
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") && VALID_SLUG.test(file.replace(/\.mdx$/, "")))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      return { ...parseMDX(raw), slug: file.replace(/\.mdx$/, ""), published: isPublished(raw) };
    })
    .filter((post) => post.published)
    .map(({ published: _published, ...post }) => post)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): PostSummary | null {
  if (!VALID_SLUG.test(slug)) return null;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  if (!isPublished(raw)) return null;
  return { ...parseMDX(raw), slug };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string): PostSummary[] {
  const normalized = tag.trim().toLowerCase();
  return getAllPosts().filter((post) => post.tags.includes(normalized));
}
