import { NextResponse } from "next/server";

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

    // ✅ Static pages
    const staticUrls = [
      `${baseUrl}/`,
      `${baseUrl}/about`,
      `${baseUrl}/privacy`,
    ];

    // ✅ Example drug list (TEMP — we improve later)
    const res = await fetch("https://meddatatool.com/api/all-drugs");
const drugs: string[] = await res.json();

    const drugUrls = drugs.map(
      (drug) => `${baseUrl}/drugs/${encodeURIComponent(drug)}`
    );

    const allUrls = [...staticUrls, ...drugUrls];

    const xml = generateSitemapXml(allUrls);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
} 