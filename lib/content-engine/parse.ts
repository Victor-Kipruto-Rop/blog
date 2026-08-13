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

  return {
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString().slice(0, 10),
    tags: data.tags || [],
    content,
    readingTime: stats.text,
  };
}
