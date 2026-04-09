import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "MedDataTool Blog – Drug Guides, Dosage & Side Effects",
  description:
    "Read medication guides, drug safety tips, dosage explanations, and side effect information for commonly prescribed medicines.",
  alternates: {
    canonical: "/blog",
  },
};

interface Blog {
  slug: string;
  title: string;
  description?: string;
  publishDate?: string;
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
    <main style={{ padding: "20px 40px 40px", maxWidth: "1100px", margin: "auto" }}>
      
      {/* Page Heading */}
      <h1 style={{ marginBottom: "5px", fontSize: "30px" }}>
        MedDataTool Blog
      </h1>

      <p style={{ marginBottom: "15px", color: "#555" }}>
        Latest articles about medications, side effects, dosage guidance,
        and FDA drug safety.
      </p>

      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              style={{
                border: "1px solid #eee",
                borderRadius: "10px",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
                transition: "0.2s",
              }}
            >
              {/* Blog Image */}
              {blog.image && (
              <Image
  src={blog.image}
  alt={blog.title}
  width={400}
  height={250}
  style={{
    width: "100%",
    height: "180px",
    objectFit: "cover",
  }}
/>
              )}

              {/* Blog Content */}
              <div style={{ padding: "18px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.4",
                    marginBottom: "10px",
                  }}
                >
                  {blog.title}
                </h2>

              

                {blog.publishDate && (
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {blog.publishDate}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
} 