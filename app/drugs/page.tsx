import Link from "next/link";
import { allDrugs } from "@/data/allDrugs";

export default function DrugsIndexPage() {

  const sortedDrugs = [...new Set(allDrugs)].sort();

  return (
    <main style={{ padding: 40 }}>
      <h1>Drugs A–Z</h1>

      <ul>
        {sortedDrugs.map((drug) => (
          <li key={drug}>
            <Link href={`/drugs/${drug}`}>
              {drug}
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
} 