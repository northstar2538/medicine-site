export async function GET() {
  try {
    const res = await fetch(
      "https://api.fda.gov/drug/label.json?limit=100"
    );

    const json = await res.json();

    const drugs =
      json.results
        ?.map((item: any) => item.openfda?.brand_name?.[0])
        .filter(Boolean) || [];

    return new Response(JSON.stringify(drugs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}