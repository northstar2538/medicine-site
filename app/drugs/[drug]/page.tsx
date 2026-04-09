
import DrugClient from "./DrugClient";
import { Metadata } from "next";

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

// ✅ METADATA (FIXED)
 export async function generateMetadata({
  params,
}: {
  params: { drug: string };
}) {

  const drug = params.drug;

  const canonicalUrl = `https://www.meddatatool.com/drugs/${drug}`;

  return {
    title: `${drug} - MedDataTool | FDA Drug Info`,
    description: `Find detailed information about ${drug}, including uses, dosage, side effects, warnings, and FDA references.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// ✅ MAIN PAGE (FIXED)
 export default async function Page({
  params,
}: {
  params: { drug: string };
}) {

  const drug = (params.drug || "").toLowerCase();

  let mainDrug: FDAResult | null = null;
  let otherBrands: string[] = [];

  try {
 const res = await fetch(
  `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drug}+OR+openfda.generic_name:${drug}&limit=20`,
  { cache: "no-store" }
);

    if (res.ok) {
      const json = await res.json();
      const data: FDAResult[] = json.results || [];

      console.log("FDA DATA:", data);

      if (data.length > 0) {
        const queryLower = drug.toLowerCase();

        const matched =
          data.find((item) => {
            const brands =
              item.openfda?.brand_name?.map((n) => n.toLowerCase()) || [];
            const generics =
              item.openfda?.generic_name?.map((n) => n.toLowerCase()) || [];

            return brands.includes(queryLower) || generics.includes(queryLower);
          }) || data[0];

        mainDrug = matched;
         const brandList = [
  ...new Set(
    data.flatMap((item: FDAResult) => item.openfda?.brand_name ?? [])
  )
];

otherBrands = brandList
  .filter((b) => b.toLowerCase() !== queryLower)
  .filter((b) => !b.toLowerCase().includes(" and "));
      }
    }
  } catch (err) {
    console.error(err);
  }

  if (!mainDrug) {
    return <p style={{ padding: 20 }}>No data found for "{drug}"</p>;
  }

  return (
  <>
 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Drug",
      name: drug,
      description: `Information about ${drug} including uses, dosage, side effects, and warnings.`,
      url: `https://www.meddatatool.com/drugs/${drug}`,
      drugClass: "Medication",
      isAccessibleForFree: true
    }),
  }}
/>

    <DrugClient
      mainDrug={mainDrug}
      otherBrands={otherBrands}
      initialDrug={drug}
    />
  </>
);
} 
 