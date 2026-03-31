"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DisclaimerCard from "./components/DisclaimerCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/drugs/${query}`);
  };

  return (
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
          placeholder="Search drug name (e.g., Metformin)"
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

      {/* Example Searches */}
      <p className="text-center text-gray-700 mt-2">
        Example searches:{" "}
        <a href="/drugs/Metformin" className="text-blue-600 hover:underline">Metformin</a>,{" "}
        <a href="/drugs/Amoxicillin" className="text-blue-600 hover:underline">Amoxicillin</a>,{" "}
        <a href="/drugs/Atorvastatin" className="text-blue-600 hover:underline">Atorvastatin</a>
      </p>

      {/* Intro Paragraph */}
      <p className="text-center text-gray-700 mt-4 max-w-xl mx-auto">
        Welcome to <strong>MedDataTool</strong> – your trusted source for accurate drug information,
        <strong> FDA references</strong>, and AI-generated summaries for informational purposes.
        Search for any drug above to find detailed uses, dosage guidance, side effects, warnings,
        and helpful AI insights to understand the information quickly and safely.
      </p>

      {/* Disclaimer */}
      <DisclaimerCard />

    </main>
  );
} 