export const metadata = {
  title: "Contact MedDataTool",
  description:
    "Contact MedDataTool for questions, feedback, or support regarding our drug information platform and medication data sources.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Contact</h1>
      <p>If you have questions about MedDataTool, contact us at:</p>
      <p>
        <strong>
          <a
            href="mailto:contact@meddatatool.com"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            contact@meddatatool.com
          </a>
        </strong>
      </p>
    </main>
  );
} 