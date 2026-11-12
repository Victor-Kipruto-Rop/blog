import matter from "gray-matter";
import readingTime from "reading-time";

export interface ParsedPost {
  title: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export function parseMDX(raw: string): ParsedPost {
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const parsedDate = data.date ? new Date(data.date) : null;
  const date = parsedDate && !Number.isNaN(parsedDate.getTime())
    ? parsedDate.toISOString().slice(0, 10)
    : "";

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag: unknown): tag is string => typeof tag === "string").map((tag: string) => tag.trim().toLowerCase()).filter(Boolean)
    : [];

  return {
    title: typeof data.title === "string" && data.title.trim() ? data.title.trim() : "Untitled",
    date,
    tags: [...new Set(tags)],
    content,
    readingTime: stats.text
  };
}
