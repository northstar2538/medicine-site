 export const metadata = {
  title: "Privacy Policy | MedDataTool",
  description:
    "Read the MedDataTool privacy policy to learn how we handle user information, cookies, and analytics on our drug information platform.",
  alternates: {
    canonical: "/privacy",
  },
};
export default function PrivacyPage() {
  return (
    <main style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>Privacy Policy</h1>

      <p>
        At MedDataTool, your privacy is important to us. We do not store any personal information you provide during your searches. 
        All data displayed comes from publicly available FDA sources and AI-generated summaries for informational purposes only.
      </p>

      <h2 style={{ marginTop: 20, fontSize: 20 }}>Information We Collect</h2>
      <p>
        We do not collect or store personally identifiable information. Your search queries are only used temporarily in your browser session.
      </p>

      <h2 style={{ marginTop: 20, fontSize: 20 }}>Cookies & Analytics</h2>
      <p>
        We may use cookies and analytics services like Google Analytics to improve our website experience, but no personal information is stored.
      </p>

      <h2 style={{ marginTop: 20, fontSize: 20 }}>External Links</h2>
      <p>
        Our site may contain links to external websites. We are not responsible for their privacy practices.
      </p>

      <h2 style={{ marginTop: 20, fontSize: 20 }}>Contact</h2>
      <p>
        For privacy concerns, please contact us at <a
  href="mailto:contact@meddatatool.com"
  style={{ color: "#2563eb", textDecoration: "underline" }}
>
  contact@meddatatool.com
</a>.
      </p>
    </main>
  );
}