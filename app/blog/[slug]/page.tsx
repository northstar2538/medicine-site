import fs from "fs";
import path from "path";
import Image from "next/image";
import { allDrugs } from "@/data/allDrugs";

/* ---------- EXTRACT FAQ FOR SCHEMA ---------- */

function extractFaq(content: string) {
  const faqItems: any[] = [];

  const regex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;

  let match;

  while ((match = regex.exec(content)) !== null) {
    faqItems.push({
      "@type": "Question",
      name: match[1],
      acceptedAnswer: {
        "@type": "Answer",
        text: match[2],
      },
    });
  }

  return faqItems;
}

/* ---------- BLOG TYPE ---------- */

interface Blog {
  slug: string;
  title: string;
  description?: string;
  publishDate?: string;
  contentFile: string;
  image?: string;
}

/* ---------- LOAD BLOGS ---------- */

function getBlogs(): Blog[] {
  const filePath = path.join(process.cwd(), "data", "blogs.json");

  if (!fs.existsSync(filePath)) return [];

  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

/* ---------- AUTO DRUG LINKING ---------- */
function autoLinkDrugs(content: string) {

  let processedContent = content;

  allDrugs.forEach((drug) => {

    const regex = new RegExp(`\\b${drug}\\b`, "i");

    processedContent = processedContent.replace(regex, (match) => {

      // prevent linking inside existing anchor tags
      if (processedContent.includes(`href="/drugs/${drug}"`)) {
        return match;
      }

      return `<a href="/drugs/${drug}" style="color:#2563eb;font-weight:600;">${match}</a>`;

    });

  });

  return processedContent;

} 

  // ✅ Fixed — await params first
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "MedDataTool Blog",
      description: "Medical information and drug safety articles.",
    };
  }

  const canonicalUrl = `https://www.meddatatool.com/blog/${blog.slug}`;
  const imageUrl = blog.image
    ? `https://www.meddatatool.com${blog.image}`
    : "https://www.meddatatool.com/logo.png";

  return {
    title: {
      absolute: `${blog.title} | MedDataTool`,
    },
    description: blog.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.publishDate,
      images: [{ url: imageUrl, width: 800, height: 420 }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
/* ---------- PAGE ---------- */

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const blogs = getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <p style={{ padding: 20 }}>Blog not found</p>;
  }

  /* ---------- LOAD HTML ARTICLE ---------- */

  const contentPath = path.join(
    process.cwd(),
    "data/blog-content",
    blog.contentFile
  );

  let content = "";

  if (fs.existsSync(contentPath)) {
    content = fs.readFileSync(contentPath, "utf-8");
  }

  /* ---------- AUTO LINK DRUGS ---------- */

  const processedContent = autoLinkDrugs(content);

  /* ---------- FAQ SCHEMA ---------- */

  const faqItems = extractFaq(content);

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems,
        }
      : null;

  /* ---------- PAGE RENDER ---------- */

  return (
    <main className="blog-wrapper">

      {/* FAQ Structured Data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="blog-container">

        {/* TITLE */}
        <h1 className="blog-title">{blog.title}</h1>

        {/* META */}
        {blog.publishDate && (
          <p className="blog-meta">
            <span>Medical Info</span>
            Published: {new Date(blog.publishDate).toLocaleDateString()}
          </p>
        )}

        {/* IMAGE */}
        {blog.image && (
          <Image
            src={blog.image}
            alt={`${blog.title} infographic`}
            width={800}
            height={420}
            className="blog-image"
          />
        )}

        {/* BLOG CONTENT */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
  {/* RELATED DRUGS */}

<div
  style={{
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "50px",
  }}
>
  <h2 style={{ marginBottom: "12px" }}>
    Related Drugs
  </h2>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

    <a href="/drugs/glipizide"
      style={{
        border: "1px solid #d1d5db",
        padding: "6px 12px",
        borderRadius: "20px",
        color: "#2563eb",
        fontWeight: 500,
        fontSize: "14px",
        textDecoration: "none"
      }}>
      Glipizide
    </a>

    <a href="/drugs/insulin"
      style={{
        border: "1px solid #d1d5db",
        padding: "6px 12px",
        borderRadius: "20px",
        color: "#2563eb",
        fontWeight: 500,
        fontSize: "14px",
        textDecoration: "none"
      }}>
      Insulin
    </a>

    <a href="/drugs/januvia"
      style={{
        border: "1px solid #d1d5db",
        padding: "6px 12px",
        borderRadius: "20px",
        color: "#2563eb",
        fontWeight: 500,
        fontSize: "14px",
        textDecoration: "none"
      }}>
      Januvia
    </a>

    <a href="/drugs/glyxambi"
      style={{
        border: "1px solid #d1d5db",
        padding: "6px 12px",
        borderRadius: "20px",
        color: "#2563eb",
        fontWeight: 500,
        fontSize: "14px",
        textDecoration: "none"
      }}>
      Glyxambi
    </a>

  </div>
</div>
        {/* DISCLAIMER */}
        <div className="blog-disclaimer">
          <strong>Medical Disclaimer</strong>
          <p>
            The information provided in this article is for educational and
            informational purposes only and is not intended as medical advice.
            Always consult a qualified healthcare professional before starting
            or stopping any medication. MedDataTool does not replace
            professional medical consultation.
          </p>
        </div>

      </article>

    </main>
  );
}