function ScoreCard({ score, verdict, confidence }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  return e(
    "section",
    { className: "result-section score-section reveal" },
    e("h2", { className: "result-heading" }, "Analysis Result"),
    e(
      "div",
      { className: "score-card" },
      e(
        "div",
        { className: "score-ring-wrap" },
        e(
          "svg",
          { viewBox: "0 0 220 220", className: "score-ring" },
          e("circle", { className: "score-ring-bg", cx: 110, cy: 110, r: radius }),
          e("circle", {
            className: "score-ring-fill",
            cx: 110,
            cy: 110,
            r: radius,
            strokeDasharray: circumference,
            strokeDashoffset: circumference - filled,
          })
        ),
        e(
          "div",
          { className: "score-value-wrap" },
          e("span", { className: "score-value" }, `${score}%`),
          e("span", { className: "score-label" }, "Credibility Score")
        )
      ),
      e(
        "div",
        { className: "score-meta" },
        e("span", { className: `verdict-badge verdict-${verdictKey(verdict)}` }, verdict),
        e("span", { className: "score-confidence" }, `Model Confidence: ${confidence}%`)
      )
    )
  );
}

function verdictKey(verdict) {
  const text = (verdict || "").toLowerCase();
  if (text.includes("high")) return "high";
  if (text.includes("low")) return "low";
  if (text.includes("uncertain")) return "uncertain";
  return "likely";
}
