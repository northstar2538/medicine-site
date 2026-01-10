 import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { medicineName } = body;

    if (!medicineName) {
      return NextResponse.json({ error: "Medicine name is required" }, { status: 400 });
    }

    // Fetch data from FDA API
    const fdaRes = await fetch(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medicineName}"+OR+openfda.generic_name:"${medicineName}"&limit=1`
    );

    if (!fdaRes.ok) {
      return NextResponse.json({ error: "Failed to fetch data from FDA" }, { status: 500 });
    }

    const fdaData = await fdaRes.json();
    const drug = fdaData.results?.[0];

    if (!drug) {
      return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: drug.openfda?.brand_name?.[0] || medicineName,
      genericName: drug.openfda?.generic_name?.[0] || "",
      uses: drug.indications_and_usage?.[0] || "",
      dosage: drug.dosage_and_administration?.[0] || "",
      sideEffects: drug.adverse_reactions?.[0] || "",
      warnings: drug.warnings?.[0] || "",
      image: drug.image?.[0] || "", // optional if FDA has an image
    });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
