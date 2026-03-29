import { NextResponse } from "next/server";
import { allDrugs } from "@/data/allDrugs";

function generateSitemapXml(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("")}
</urlset>`;
}

export async function GET() {
  try {
    const baseUrl = "https://meddatatool.com";

    // Static pages
    const staticUrls = [
      `${baseUrl}/`,
      `${baseUrl}/about`,
      `${baseUrl}/privacy`,
      `${baseUrl}/contact`,
    ];

    // Remove duplicate drug names
    const uniqueDrugs = [...new Set(allDrugs)];

    // Convert drug names to SEO-friendly slugs
    const drugUrls = uniqueDrugs.map((drug) => {
      const slug = drug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      return `${baseUrl}/drugs/${slug}`;
    });

    const allUrls = [...staticUrls, ...drugUrls];

    const xml = generateSitemapXml(allUrls);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Sitemap error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
} 