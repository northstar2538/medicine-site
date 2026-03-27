export default function DisclaimerCard() {
  return (
    <div
      style={{
        marginTop: 40,
        padding: 16,
        backgroundColor: "#fff3cd",
        borderLeft: "4px solid #ffeeba",
        borderRadius: 6,
        fontSize: 12,
        color: "#856404",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <strong>Medical Disclaimer:</strong> This content is provided for informational
and educational purposes only and is not intended as medical advice.
Always consult a qualified healthcare provider before taking any medication.
<br />
<strong>Data Source:</strong> Publicly available drug labeling information from the U.S. Food and Drug Administration (FDA).
    </div>
  );
}