const LOADING_STEPS = [
  "Preparing analysis",
  "Checking credibility signals",
  "Generating assessment",
];

function LoadingState() {
  return e(
    "div",
    { className: "loading-state", role: "status", "aria-live": "polite" },
    e("div", { className: "spinner", "aria-hidden": "true" }),
    e("p", { className: "loading-title" }, "Analyzing your content..."),
    e(
      "div",
      { className: "loading-steps" },
      LOADING_STEPS.map((step, i) =>
        e(
          "span",
          { key: step, className: "loading-step", style: { animationDelay: `${i * 0.8}s` } },
          step
        )
      )
    ),
    e("p", { className: "loading-note" }, "Please wait...")
  );
}
