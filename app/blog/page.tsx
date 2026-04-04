import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  slug: string;
  title: string;
  content: string;
  image?: string;
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
    <main style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ marginBottom: "30px" }}>Medical Blog</h1>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "auto" }}
                />
              )}

              <div style={{ padding: "15px" }}>
                <h2 style={{ fontSize: "18px", lineHeight: "1.4" }}>
                  {blog.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
} 