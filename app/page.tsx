 "use client";

import { useState } from "react";
import { MagnifyingGlassIcon,  HeartIcon } from "@heroicons/react/24/solid";


// ✅ Brand → Generic Mapping (lowercase keys)
const brandToGeneric: Record<string, string> = {
  tylenol: "acetaminophen",
  panadol: "acetaminophen",
  paracetamol: "acetaminophen",
  advil: "ibuprofen",
  motrin: "ibuprofen",
  nurofen: "ibuprofen",
  aspirin: "aspirin",
  voltaren: "diclofenac",
  naprosyn: "naproxen",
  aleve: "naproxen",
  benadryl: "diphenhydramine",
  claritin: "loratadine",
  zyrtec: "cetirizine",
  allegra: "fexofenadine",
  lipitor: "atorvastatin",
  crestor: "rosuvastatin",
  xanax: "alprazolam",
  valium: "diazepam",
  prozac: "fluoxetine",
  zoloft: "sertraline",
  glucophage: "metformin",
  januvia: "sitagliptin",
  plavix: "clopidogrel",
  lasix: "furosemide",
  synthroid: "levothyroxine",
  amoxil: "amoxicillin",
  augmentin: "amoxicillin/clavulanate",
  keflex: "cephalexin",
  cipro: "ciprofloxacin",
  diflucan: "fluconazole",
  prednisone: "prednisone",
  hydrocodone: "hydrocodone",
  oxycontin: "oxycodone",
};

export default function HomePage() {
  const [medicineName, setMedicineName] = useState("");
  const [medicineInfo, setMedicineInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    setLoading(true);
    setError("");
    setMedicineInfo(null);

    try {
      const normalized = medicineName.trim().toLowerCase();
      const query = brandToGeneric[normalized] || normalized;

      const res = await fetch("/api/medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Medicine not found");
      } else {
        setMedicineInfo(data);
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-12">
      {/* Header */}
    <div className="flex items-center justify-between mb-8 w-full max-w-3xl">
  <div className="flex items-center gap-3">
    <HeartIcon className="w-12 h-12 text-blue-600" />

    <h1 className="text-4xl font-bold">Medicine Information Tool</h1>
  </div>
</div>

      {/* Search Form */}
      <form
  onSubmit={handleSearch}
  className="relative flex items-center gap-2 mb-6 w-full max-w-xl"
>
  <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-gray-400" />

  <input
    type="text"
    placeholder="Search medicine"
    value={medicineName}
    onChange={(e) => setMedicineName(e.target.value)}
    className="w-full pl-10 pr-4 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
  >
    {loading ? "Searching..." : "Search"}
  </button>

  {/* Home button */}
  <button
    type="button"
    onClick={() => {
      setMedicineInfo(null);
      setMedicineName("");
      setError("");
    }}
    className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
  >
    Home
  </button>
</form>


      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Medicine Card */}
      {medicineInfo && (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border p-6 flex gap-6">
          {/* Image (fallback for AdSense) */}
          <img
            src={
              medicineInfo.image ||
              "https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
            }
            alt={medicineInfo.name}
            className="w-32 h-32 object-contain rounded border"
          />

          {/* Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              {medicineInfo.name}
            </h2>

            <p><strong>Uses:</strong> {medicineInfo.uses}</p>
            <p><strong>Dosage:</strong> {medicineInfo.dosage}</p>
            <p><strong>Side Effects:</strong> {medicineInfo.sideEffects}</p>
            <p><strong>Warnings:</strong> {medicineInfo.warnings}</p>

            {/* AI Summary */}
            {medicineInfo.aiAnswer && (
              <div className="mt-4 p-3 border-l-4 border-amber-500 bg-amber-50 text-amber-800">
                <strong>AI Summary:</strong> {medicineInfo.aiAnswer}
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-sm text-gray-800">
              <strong>Medical Disclaimer:</strong> This content is provided for
              informational and educational purposes only and is not intended as
              a substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of a qualified healthcare
              provider before taking any medication.
            </div>
            {/* Trust Note */}
           <div className="mt-6 text-xs text-gray-500 leading-relaxed">
             <strong>Data Source:</strong> This tool uses publicly available drug labeling
             information from the U.S. Food and Drug Administration (FDA) open data
             resources. The information presented here is summarized for educational
             purposes only and may not reflect the most recent updates.
          </div>
        </div>
        </div>
      )}
      {/* SEO Content Section (Home page only) */}
{!medicineInfo && (
  <div className="mt-12 max-w-3xl text-gray-700 text-sm leading-relaxed">
    <h2 className="text-lg font-semibold mb-3">
      About This Medicine Information Tool
    </h2>

    <p className="mb-3">
      This medicine information tool helps users quickly understand the uses,
      dosage, side effects, and safety warnings of commonly prescribed medicines.
      It is designed for educational and informational purposes only.
    </p>

    <p className="mb-3">
      Drug data displayed on this page is sourced from publicly available U.S.
      Food and Drug Administration (FDA) drug labeling information. The results
      may include both generic and brand-name medicines commonly used in the
      United States.
    </p>

    <p>
      Always consult a qualified healthcare professional before starting,
      stopping, or changing any medication. This tool does not provide medical
      diagnosis or treatment recommendations.
    </p>
  </div>
  )}
  </div>
  );
}