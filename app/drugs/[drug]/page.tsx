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
  params: Promise<{ drug: string }>;
}): Promise<Metadata> {
  const { drug } = await params;

  return {
    title: `${drug} - MedDataTool | FDA Drug Info`,
    description: `Find detailed information about ${drug}, including uses, dosage, side effects, warnings, and FDA references.`,
  };
}

// ✅ MAIN PAGE (FIXED)
export default async function Page({
  params,
}: {
  params: Promise<{ drug: string }>;
}) {
  const { drug } = await params;

  let mainDrug: FDAResult | null = null;
  let otherBrands: FDAResult[] = [];

  try {
    const res = await fetch(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drug}&limit=5`,
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
        otherBrands = data.filter((item) => item !== matched);
      }
    }
  } catch (err) {
    console.error(err);
  }

  if (!mainDrug) {
    return <p style={{ padding: 20 }}>No data found for "{drug}"</p>;
  }

  return (
    <DrugClient
      mainDrug={mainDrug}
      otherBrands={otherBrands}
      initialDrug={drug}
    />
  );
} 