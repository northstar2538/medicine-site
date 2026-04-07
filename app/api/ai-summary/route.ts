// app/api/ai-summary/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { fdaData } = await request.json();

    if (!fdaData || !Array.isArray(fdaData) || fdaData.length === 0) {
      return NextResponse.json({ error: "Invalid or empty request body" }, { status: 400 });
    }
    const cacheKey = `ai-summary:${JSON.stringify(fdaData)}`;
  

    // Build a single prompt for all FDA records
    const promptParts = fdaData.map((item: any, index: number) => {
      const brand = item.openfda?.brand_name?.[0] || `Unknown Brand ${index + 1}`;
      const indications = item.indications_and_usage?.join(" ") || "";
      const dosage = item.dosage_and_administration?.join(" ") || "";
      const warnings = item.warnings?.join(" ") || "";

      return `Drug ${index + 1} - ${brand}:
Indications: ${indications}
Dosage: ${dosage}
Warnings: ${warnings}

Summarize in 1-2 concise, human-readable sentences.`;
    });

    const prompt = promptParts.join("\n\n");

    // Single OpenAI API call
 const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content:
        "You are a medical summarization assistant. Only summarize the FDA drug label text provided. Provide a simple explanation of the drug's main use, dosage guidance, and key warning in 2–3 sentences using plain language. Do not add information that is not present in the text."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.3,
});

    let text = completion.choices?.[0]?.message?.content?.trim() || "Summary unavailable.";

    // Split summaries per drug
    const summaries = text.split(/\n\n|Drug \d+ - /).filter(Boolean);

    return NextResponse.json({ summaries });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate AI summary" }, { status: 500 });
  }
} 