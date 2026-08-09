const BADGE_CLASS = {
  SUPPORTED: "badge-supported",
  REFUTED: "badge-refuted",
  MISLEADING: "badge-misleading",
  UNVERIFIED: "badge-unverified",
};

function ClaimCard({ claim }) {
  return e(
    "article",
    { className: "claim-card reveal" },
    e("h3", { className: "card-title" }, "Claim"),
    e("blockquote", { className: "claim-text" }, `“${claim.text}”`),
    e(
      "div",
      { className: "claim-meta" },
      e(
        "span",
        { className: `claim-badge ${BADGE_CLASS[claim.status] || "badge-unverified"}` },
        claim.status
      ),
      e("span", { className: "claim-confidence" }, `Confidence: ${claim.confidence}%`)
    )
  );
}
