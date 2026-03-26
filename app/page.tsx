"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DisclaimerCard from "./components/DisclaimerCard";
import Head from "next/head";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/drugs/${query}`);
  };

  return (
    <>
      {/* === SEO Meta Tags === */}
      <Head>
        <title>MedDataTool – Accurate Drug Info & Pill Identifier</title>
        <meta
          name="description"
          content="MedDataTool provides accurate drug information, pill identifiers, dosage guides, AI summaries, and FDA references for patients and healthcare professionals."
        />
        <meta name="keywords" content="drug information, pill identifier, dosage guide, AI medical summary, FDA data" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MedDataTool",
              "url": "https://meddatatool.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://meddatatool.com/drugs/{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <main className="flex flex-col items-center px-4 py-10">
        {/* === H1 for SEO === */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Search Drug Information
        </h1>

        {/* === Search Form === */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-6"
        >
          <input
            type="text"
            placeholder="Enter drug name, e.g., Tylenol"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
        {/* Intro Paragraph */}
<p className="text-center text-gray-700 mt-4 max-w-xl mx-auto">
  Welcome to <strong>MedDataTool</strong> – your trusted source for accurate drug information, <strong>FDA references</strong>, and AI-generated summaries for informational purposes. Search for any drug above to find detailed uses, dosage guidance, side effects, warnings, and helpful AI insights to understand the information quickly and safely.
</p>

<p className="text-center text-gray-700 mt-2">
  Example searches:{" "}
  <a href="/drugs/Ozempic" className="text-blue-600 hover:underline">Ozempic</a>,{" "}
  <a href="/drugs/Keytruda" className="text-blue-600 hover:underline">Keytruda</a>,{" "}
  <a href="/drugs/Wegovy" className="text-blue-600 hover:underline">Wegovy</a>
</p>

    

        {/* === Disclaimer Card === */}
        <DisclaimerCard />
      </main>
    </>
  );
} 