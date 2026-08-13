import Fuse from "fuse.js";
import { getAllPosts } from "@/lib/content-engine/registry";

export function searchPosts(query: string) {
  const posts = getAllPosts();
  if (!query) return [];

  const fuse = new Fuse(posts, {
    keys: ["title", "tags", "content"],
    threshold: 0.3,
  });

  return fuse.search(query).map((r) => r.item);
}
