import Link from "next/link";
import { allDrugs } from "@/data/allDrugs";

export default function DrugsIndexPage() {

  const sortedDrugs = [...new Set(allDrugs)].sort();

  const groupedDrugs: Record<string, string[]> = sortedDrugs.reduce(
    (groups, drug) => {
      const letter = drug[0].toUpperCase();

      if (!groups[letter]) {
        groups[letter] = [];
      }

      groups[letter].push(drug);

      return groups;
    },
    {} as Record<string, string[]>
  );

  return (
    <main style={{ padding: 40 }}>
      <h1>Drugs A–Z</h1>

      {Object.keys(groupedDrugs).map((letter) => (
        <div key={letter} style={{ marginBottom: 30 }}>
          <h2>{letter}</h2>

          <ul>
            {groupedDrugs[letter].map((drug) => (
              <li key={drug}>
                <Link
                  href={`/drugs/${drug}`}
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  {drug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </main>
  );
} 