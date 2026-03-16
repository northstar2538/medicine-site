// pages/drugs/[drug].js
import { useState } from "react";
import Head from "next/head";
import { allDrugs } from "../../data/allDrugs"; // full drug list

// Fetch FDA API data dynamically
export async function getServerSideProps(context) {
  const drug = context.params.drug.trim().toLowerCase();
  const encodedDrug = encodeURIComponent(drug);

  const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodedDrug}+OR+openfda.brand_name:${encodedDrug}&limit=5`;

  let data = null;
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (err) {
    console.error("FDA API fetch error:", err);
  }

  // Generate 5 related drugs randomly for suggestions
  const related = allDrugs
    .filter(d => d !== drug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return {
    props: { drug, data, related },
  };
}

// Convert array or string to readable paragraphs
function formatText(text) {
  if (!text) return <p>No information available.</p>;
  const str = Array.isArray(text) ? text.join(" ") : text;
  return str
    .split(/(\r?\n|\.\s)/)
    .filter(line => line.trim() !== "")
    .map((line, i) => <p key={i}>{line.trim()}</p>);
}

// Highlight important keywords safely
function highlightKeywords(text) {
  if (!text) return text;
  const str = Array.isArray(text) ? text.join(" ") : text;
  const keywords = /(black box warning|serious|contraindicated|caution)/gi;
  return str.split(keywords).map((part, i) =>
    keywords.test(part) ? <strong key={i}>{part}</strong> : part
  );
}

// Expandable section component
function ExpandableSection({ title, text }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const str = Array.isArray(text) ? text.join(" ") : text;
  const summary = str.split(". ").slice(0, 3).join(". ") + "."; // first 3 sentences

  return (
    <section style={{ marginBottom: "20px" }}>
      <h2>{title}</h2>
      <p>{expanded ? str : summary}</p>
      {str.length > summary.length && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </section>
  );
}

// Main drug page component
export default function DrugPage({ drug, data, related }) {
  const result = data?.results?.[0] || null;

  return (
    <>
      <Head>
        <title>{drug} Uses, Dosage, Side Effects | Drug Information</title>
        <meta
          name="description"
          content={`Learn about ${drug} uses, dosage, warnings, and side effects from FDA drug label data.`}
        />
      </Head>

      <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
        <h1 style={{ textTransform: "capitalize", marginBottom: "20px" }}>{drug}</h1>

        {result ? (
          <>
            {/* Summary section */}
            <section>
              <h2>Summary</h2>
              <p>
                {result.indications_and_usage?.[0]
                  ? result.indications_and_usage[0].split(". ").slice(0, 3).join(". ") + "."
                  : "No summary available."}
              </p>
            </section>

            {/* Expandable sections */}
            <ExpandableSection title="Uses" text={result.indications_and_usage} />
            <ExpandableSection title="Warnings" text={highlightKeywords(result.warnings)} />
            <ExpandableSection title="Side Effects" text={result.adverse_reactions} />
            <ExpandableSection title="Dosage" text={result.dosage_and_administration} />
            <ExpandableSection title="Other Information" text={result.other_sections} />

            {/* Related Drugs */}
            {related.length > 0 && (
              <section>
                <h2>Related Drugs</h2>
                <ul>
                  {related.map((d) => (
                    <li key={d}>
                      <a href={`/drugs/${d}`} style={{ color: "blue" }}>{d}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <p>
            No FDA label found for "{drug}". You can still try our{" "}
            <a href="/search">search tool</a> for more medicines.
          </p>
        )}

        <footer style={{ marginTop: "40px", fontSize: "12px", color: "#555" }}>
          Information sourced from the FDA database. This content is for educational purposes only and is not medical advice.
        </footer>
      </div>
    </>
  );
} 