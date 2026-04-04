import fs from "fs";
import path from "path";
import Image from "next/image";
import { allDrugs } from "@/data/allDrugs";

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

interface Blog {
  slug: string;
  title: string;
  content: string;
  image?: string;
}

function getBlogs(): Blog[] {
  const filePath = path.join(process.cwd(), "data", "blogs.json");

  if (!fs.existsSync(filePath)) return [];

  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}
 function autoLinkDrugs(content: string) {
  let processedContent = content;

  allDrugs.forEach((drug) => {
    const regex = new RegExp(`\\b${drug}\\b`, "i");

    processedContent = processedContent.replace(
      regex,
      `<a href="/drugs/${drug}" class="text-blue-600 hover:underline font-medium">${drug}</a>`
    );
  });

  return processedContent;
}

  

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

  /* ---------- FAQ SCHEMA ---------- */

  const faqItems = extractFaq(blog.content);

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems,
        }
      : null;

  /* ---------- PAGE ---------- */

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "auto" }}>

      {/* FAQ structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {blog.image && (
        <Image
          src={blog.image}
          alt={`${blog.title} infographic`}
          width={800}
          height={400}
          style={{ marginTop: 20, borderRadius: 6 }}
        />
      )}

      {/* Blog Content */}
 <div
  className="blog-content mt-6 leading-7 text-gray-800"
  dangerouslySetInnerHTML={{
    __html: autoLinkDrugs(blog.content).replace(
      "<h2>Frequently Asked Questions</h2>",
      '<h2 class="faq-section">Frequently Asked Questions</h2>'
    ),
  }}
/>

      {/* Medical Disclaimer */}
      <div className="mt-10 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
        <strong className="text-blue-700">Medical Disclaimer</strong>
        <p className="mt-2 text-gray-700">
          The information provided in this article is for educational and
          informational purposes only and is not intended as medical advice.
          Always consult a qualified healthcare professional before starting or
          stopping any medication. MedDataTool does not replace professional
          medical consultation.
        </p>
      </div>

    </main>
  );
} 