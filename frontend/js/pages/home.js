function HomePage() {
  return e(
    Fragment,
    null,
    e(
      "section",
      { className: "hero" },
      e(
        "div",
        { className: "container" },
        e("p", { className: "hero-eyebrow" }, "MULTIMODAL CREDIBILITY ANALYSIS"),
        e("h1", { className: "hero-title" }, "Verify Before You Believe."),
        e(
          "p",
          { className: "hero-subtitle" },
          "Analyze text, images, audio and video to assess the credibility of information."
        ),
        e(
          "a",
          { href: "#/verify", className: "btn btn-accent btn-lg" },
          "Verify Now"
        )
      )
    ),
    e(
      "section",
      { className: "section demo-section" },
      e(
        "div",
        { className: "container" },
        e(
          "div",
          { className: "demo-card" },
          e("p", { className: "demo-eyebrow" }, "PREVIEW — MOCK ANALYSIS CARD"),
          e("h2", { className: "demo-title" }, "Credibility Score"),
          e("div", { className: "demo-score" }, "78%"),
          e(
            "span",
            { className: "verdict-badge verdict-likely" },
            "LIKELY CREDIBLE"
          ),
          e("p", { className: "demo-meta" }, "Confidence: 86%"),
          e(
            "p",
            { className: "demo-note" },
            "Visual demonstration only. Results are mocked in this Stage 1 prototype."
          )
        )
      )
    ),
    e(
      "section",
      { className: "section" },
      e(
        "div",
        { className: "container" },
        e("h2", { className: "section-title" }, "WHAT CAN CLARIFACT ANALYZE?"),
        e(
          "div",
          { className: "card-grid grid-4" },
          cardPreview("Text", "Analyze written claims and statements."),
          cardPreview("Image", "Analyze information contained in images."),
          cardPreview("Audio", "Analyze spoken information."),
          cardPreview("Video", "Analyze spoken and visual content.")
        )
      )
    ),
    e(
      "section",
      { className: "section section-alt" },
      e(
        "div",
        { className: "container" },
        e("h2", { className: "section-title" }, "WHAT WE AIM TO DETECT"),
        e(
          "div",
          { className: "card-grid grid-4" },
          sectionCard("01", "Misinformation"),
          sectionCard("02", "Misleading Claims"),
          sectionCard("03", "Undisclosed Paid Promotions"),
          sectionCard("04", "Hidden Advertisements")
        )
      )
    ),
    e(
      "section",
      { className: "section" },
      e(
        "div",
        { className: "container" },
        e("h2", { className: "section-title" }, "HOW IT WORKS"),
        e(
          "p",
          { className: "section-subtitle" },
          "Planned workflow — the real AI pipeline arrives in Stage 2."
        ),
        e(
          "div",
          { className: "steps" },
          workflowStep("01", "Input", "Submit your content."),
          workflowStep("02", "Extract", "Identify relevant information."),
          workflowStep("03", "Verify", "Evaluate the submitted claims."),
          workflowStep("04", "Analyze", "Look for credibility and promotional signals."),
          workflowStep("05", "Score", "Generate a credibility score.")
        )
      )
    ),
    e(
      "section",
      { className: "section cta-section" },
      e(
        "div",
        { className: "container cta-card" },
        e("h2", { className: "cta-title" }, "Ready to verify?"),
        e("p", { className: "cta-subtitle" }, "See what ClariFact AI can tell you."),
        e(
          "a",
          { href: "#/verify", className: "btn btn-accent btn-lg" },
          "Start Verifying"
        )
      )
    )
  );
}

function cardPreview(title, body) {
  return e(
    "div",
    { className: "card" },
    e("h3", { className: "card-title" }, title),
    e("p", { className: "card-body" }, body)
  );
}

function sectionCard(number, title) {
  return e(
    "div",
    { className: "card numbered" },
    e("span", { className: "card-number" }, number),
    e("h3", { className: "card-title" }, title)
  );
}

function workflowStep(num, title, body) {
  return e(
    "div",
    { className: "step" },
    e("span", { className: "step-num" }, num),
    e("h3", { className: "step-title" }, title),
    e("p", { className: "step-body" }, body)
  );
}
