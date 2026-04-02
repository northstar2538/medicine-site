"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DrugUI from "./DrugUI";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

interface FDAResult {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
  };
  description?: string[];
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  warnings?: string[];
}

interface Props {
  mainDrug: FDAResult;
  otherBrands: string[];
  initialDrug: string;
}

export default function DrugClient({ mainDrug, otherBrands, initialDrug }: Props) {
  const router = useRouter();

  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialDrug);

  // Remove duplicate brand names
  const uniqueBrands: string[] = Array.from(
  new Map(
    otherBrands
      .filter(Boolean)
      .map((brand) => [brand.toLowerCase(), brand])
  ).values()
);

  // Fetch AI summary
  useEffect(() => {
    async function fetchAI() {
      try {
        setAiLoading(true);

        const res = await fetch("/api/ai-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fdaData: [mainDrug] }),
        });

        const data = await res.json();

        setAiSummary(data.summaries?.[0] || "AI summary unavailable.");
      } catch {
        setAiSummary("AI summary unavailable.");
      } finally {
        setAiLoading(false);
      }
    }

    fetchAI();
  }, [mainDrug]);

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/drugs/${searchQuery.trim()}`);
  };

  return (
    <main style={{ flex: 1, padding: 20, fontFamily: "Arial, sans-serif" }}>
      
      {/* SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        style={{ maxWidth: 500, display: "flex", gap: 10, margin: "20px auto" }}
      >
        <input
          type="text"
          placeholder="Enter drug name, e.g., Tylenol"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 14px",
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#1a73e8",
            color: "white",
            fontWeight: "bold",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* AI SUMMARY */}
      {aiLoading ? (
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <p>Generating summary...</p>
        </div>
      ) : (
        <DrugUI
          drugData={{
            name: mainDrug.openfda?.brand_name?.[0] || initialDrug,
            uses: mainDrug.indications_and_usage?.join(" ") || "N/A",
            dosage: mainDrug.dosage_and_administration?.join(" ") || "N/A",
            sideEffects: mainDrug.description?.join(" ") || "N/A",
            warnings: mainDrug.warnings?.join(" ") || "N/A",
            aiSummary,
          }}
        />
      )}

      {/* OTHER BRANDS */}
      {uniqueBrands.length > 0 && (
        <div
          style={{
            maxWidth: 800,
            margin: "20px auto",
            padding: 16,
            borderLeft: "4px solid #ccc",
            backgroundColor: "#f9f9f9",
            borderRadius: 6,
          }}
        >
          <strong>Other Brands:</strong>

          <ul style={{ listStyleType: "disc", paddingLeft: 20, marginTop: 8 }}>
            {uniqueBrands.map((brand, idx) => (
              <li key={idx}>
                <a
                  href={`/drugs/${slugify(brand)}`}
                  style={{ color: "#1a73e8", textDecoration: "underline" }}
                >
                  {brand}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MEDICAL DISCLAIMER */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: "#fff3cd",
          borderLeft: "4px solid #ffeeba",
          borderRadius: 6,
          fontSize: 12,
          color: "#856404",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <strong>Medical Disclaimer:</strong> This content is provided for informational and educational purposes only and is not intended as medical advice. Always consult a qualified healthcare provider before taking any medication.
        <br />
        <strong>Data Source:</strong> Publicly available drug labeling information from the U.S. Food and Drug Administration (FDA).
      </div>

    </main>
  );
} 