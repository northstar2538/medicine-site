import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Analytics } from "@vercel/analytics/react";

 export const metadata = {
  metadataBase: new URL("https://www.meddatatool.com"),
  title: "MedDataTool – Drug Information, Dosage, Side Effects & FDA Data",
  description:
    "Search medications like Metformin, Amoxicillin, Atorvastatin and thousands more. Get drug uses, dosage, side effects, warnings, and FDA label information.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'Arial, sans-serif',
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // ✅ important
        }}
      >
        
 {/* NAVBAR */}
 {/* NAVBAR */}
<header
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // allows mobile wrapping
    padding: "15px 20px",
    borderBottom: "1px solid #eee",
    background: "linear-gradient(90deg, #007BFF, #00A3FF)",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  }}
> <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img
      src="/logo.png"
      alt="MedDataTool"
      style={{ width: 40, height: 40 }}
    />

    <span style={{ fontWeight: "900", fontSize: "20px" }}>
      MedDataTool
    </span>
  </div>
</Link>

  <nav
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap", // allows nav items to wrap on mobile
      marginTop: "10px"
    }}
  >
    <a href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "700" }}>
      Home
    </a>

    <a href="/drugs" style={{ color: "#fff", textDecoration: "none", fontWeight: "700" }}>
      Drugs A–Z
    </a>

    <a href="/blog" style={{ color: "#fff", textDecoration: "none", fontWeight: "700" }}>
      Blog
    </a>

    <a href="/about" style={{ color: "#fff", textDecoration: "none", fontWeight: "700" }}>
      About
    </a>
  </nav>
</header>
        {/* PAGE CONTENT */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

 {/* FOOTER */}
<footer
  style={{
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: 12,
  }}
>
  <p>© 2026 MedDataTool</p>

  <div style={{ marginTop: 8 }}>
    <a href="/" style={{ margin: "0 10px", color: "#1a73e8" }}>Home</a>
    <a href="/about" style={{ margin: "0 10px", color: "#1a73e8" }}>About</a>
    <a href="/privacy" style={{ margin: "0 10px", color: "#1a73e8" }}>Privacy</a>
    <a href="/contact" style={{ margin: "0 10px", color: "#1a73e8" }}>Contact</a>
    <a href="/blog" style={{ margin: "0 10px", color: "#1a73e8" }}>Blog</a>
  </div>
</footer>

<Analytics />

      </body>
    </html>
  );
}  