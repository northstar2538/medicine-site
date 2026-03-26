// File: app/utils/formatDrugData.tsx
import * as React from "react";

/**
 * Converts raw drug text into readable paragraphs and line breaks.
 * Handles very long text for FDA info.
 */
export function formatDrugData(rawData: string): React.ReactElement {
  if (!rawData) {
    return <p>No data available.</p>;
  }

  // Split by double line breaks (paragraphs), then by single line breaks
  const paragraphs = rawData.split(/\n\s*\n/);

  return (
    <div style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
      {paragraphs.map((para, idx) => {
        // Split by single line breaks within paragraphs
        const lines = para.split(/\n/).filter(Boolean);

        return (
          <p key={idx}>
            {lines.map((line, i) => {
              const [key, ...rest] = line.split(":");
              const value = rest.join(":").trim();
              const label = key?.trim() || null;

              if (label && value) {
                return (
                  <React.Fragment key={i}>
                    <strong>{label}:</strong> {value}
                    <br />
                  </React.Fragment>
                );
              }
              return <React.Fragment key={i}>{line}<br /></React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
} 