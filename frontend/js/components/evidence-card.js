function EvidenceCard({ evidence }) {
  return e(
    "article",
    { className: "evidence-card reveal" },
    e(
      "div",
      { className: "evidence-head" },
      e("span", { className: "evidence-source" }, evidence.source),
      e(
        "span",
        { className: `evidence-type type-${(evidence.type || "").toLowerCase()}` },
        evidence.type
      )
    ),
    e("p", { className: "evidence-relevance" }, `Relevance: ${evidence.relevance || 0}%`),
    e("p", { className: "evidence-desc" }, evidence.description || "No evidence description."),
    e("p", { className: "evidence-demo-note" }, "Mock evidence for interface demonstration.")
  );
}
