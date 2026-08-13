import { getAllPosts } from "@/lib/content-engine/registry";

export default function PostsIndex() {
  const posts = getAllPosts();
  return (
    <div>
      <p className="font-mono text-accent text-sm mb-4">$ ls posts/ -la</p>
      <table className="w-full text-sm font-mono">
        <thead className="text-gray-500 border-b border-border">
          <tr>
            <th className="text-left py-2">date</th>
            <th className="text-left py-2">title</th>
            <th className="text-left py-2">tags</th>
            <th className="text-left py-2">read</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.slug} className="border-b border-border/50 hover:bg-panel">
              <td className="py-2 text-gray-500">{p.date}</td>
              <td className="py-2">
                <a href={`/posts/${p.slug}`} className="text-gray-200 hover:text-accent">
                  {p.title}
                </a>
              </td>
              <td className="py-2 text-gray-500">{p.tags.join(", ")}</td>
              <td className="py-2 text-gray-500">{p.readingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
