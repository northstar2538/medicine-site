import fs from "fs";
import path from "path";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  content: string;
}

export default function BlogPage() {
  const filePath = path.join(process.cwd(), "data", "blogs.json");

  let blogs: Blog[] = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    blogs = JSON.parse(fileData);
  } catch (error) {
    console.error("BLOG LOAD ERROR:", error);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medical Blog</h1>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <Link href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 