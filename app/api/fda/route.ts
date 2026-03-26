// app/api/fda/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const drug = searchParams.get("drug");

  if (!drug) {
    return NextResponse.json({ error: "No drug specified" }, { status: 400 });
  }

  let fdaResults: any[] = [];

  try {
    // Try search by brand name first
    const brandRes = await fetch(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${drug}"&limit=10`
    );
    if (brandRes.ok) {
      const brandJson = await brandRes.json();
      fdaResults = brandJson.results || [];
    }
  } catch {}

  // Fallback to generic name if no brand results
  if (fdaResults.length === 0) {
    try {
      const genericRes = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${drug}"&limit=10`
      );
      if (genericRes.ok) {
        const genericJson = await genericRes.json();
        fdaResults = genericJson.results || [];
      }
    } catch {}
  }

  // Remove duplicate brand names
  const seen = new Set();
  fdaResults = fdaResults.filter((item) => {
    const brand = item.openfda?.brand_name?.[0]?.toLowerCase() || "";
    if (!brand || seen.has(brand)) return false;
    seen.add(brand);
    return true;
  });

  return NextResponse.json(fdaResults);
} 