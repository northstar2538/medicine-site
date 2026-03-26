import fs from "fs";
import path from "path";
import Image from "next/image";
import { Metadata } from "next";

function getBlogs() {
  const filePath = path.join(process.cwd(), "data", "blogs.json");

  if (!fs.existsSync(filePath)) return [];

  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blogs = getBlogs();
  const blog = blogs.find((b: any) => b.slug === params.slug);

  return {
    title: blog?.title || "Medical Blog | MedDataTool",
    description: blog?.content?.slice(0, 150) || "Medical blog article",
  };
}

export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogs = getBlogs();
  const blog = blogs.find((b: any) => b.slug === params.slug);

  if (!blog) {
    return <p style={{ padding: 20 }}>Blog not found</p>;
  }

  // Internal linking for drugs
  const contentWithLinks = blog.content
    .replace(/Ibuprofen/gi, '<a href="/drugs/ibuprofen">Ibuprofen</a>')
    .replace(/Naproxen/gi, '<a href="/drugs/naproxen">Naproxen</a>')
    .replace(/Acetaminophen/gi, '<a href="/drugs/acetaminophen">Acetaminophen</a>');

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      <h1>{blog.title}</h1>

      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          style={{ borderRadius: 6, marginTop: 20 }}
        />
      )}

      <div
        style={{ whiteSpace: "pre-wrap", marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: contentWithLinks }}
      />
    </main>
  );
} 