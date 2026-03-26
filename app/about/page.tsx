"use client";

export default function AboutPage() {
  return (
    <main style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>About MedDataTool</h1>

      <p>
        MedDataTool is your trusted source for accurate drug information. We provide details such as uses, dosage, side effects, warnings, and AI-generated summaries based on publicly available FDA data.
      </p>

      <p style={{ marginTop: 16 }}>
        Our mission is to provide fast, easy-to-access drug information to help users make informed decisions and consult healthcare providers responsibly.
      </p>

      <p style={{ marginTop: 16 }}>
        All data is for informational and educational purposes only and is not a substitute for professional medical advice.
      </p>
    </main>
  );
}