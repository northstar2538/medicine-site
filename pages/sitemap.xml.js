import { allDrugs } from "../data/allDrugs";

export async function getServerSideProps({ res }) {
  const BASE_URL = "https://yourdomain.com"; // <-- replace with your real domain

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allDrugs
    .map(
      (drug) => `
    <url>
      <loc>${BASE_URL}/drugs/${drug}</loc>
      <changefreq>weekly</changefreq>
    </url>
  `
    )
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
} 