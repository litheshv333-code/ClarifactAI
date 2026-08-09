function AboutPage() {
  return e(
    "div",
    { className: "page about-page" },
    e(
      "section",
      { className: "page-head" },
      e(
        "div",
        { className: "container narrow" },
        e("h1", { className: "page-title" }, "ABOUT CLARIFACT AI"),
        e(
          "p",
          { className: "page-subtitle" },
          "Making digital information",
          e("br", null),
          "easier to evaluate."
        )
      )
    ),
    e(
      "section",
      { className: "section" },
      e(
        "div",
        { className: "container narrow" },
        e("h2", { className: "section-title" }, "THE PROBLEM"),
        e(
          "p",
          { className: "section-copy" },
          "Every day, people encounter content that is difficult to assess. Online, users increasingly run into:"
        ),
        e(
          "ul",
          { className: "about-list" },
          e("li", null, "Misinformation"),
          e("li", null, "Misleading claims"),
          e("li", null, "Undisclosed paid promotions"),
          e("li", null, "Hidden advertising"),
          e("li", null, "Manipulated or misleading digital content")
        )
      )
    ),
    e(
      "section",
      { className: "section section-alt" },
      e(
        "div",
        { className: "container narrow" },
        e("h2", { className: "section-title" }, "OUR VISION"),
        e(
          "p",
          { className: "section-copy" },
          "ClariFact AI aims to provide users with a simple way to evaluate the credibility of digital content across multiple formats."
        )
      )
    ),
    e(
      "section",
      { className: "section" },
      e(
        "div",
        { className: "container narrow" },
        e("h2", { className: "section-title" }, "HOW IT WORKS"),
        e(
          "ol",
          { className: "workflow" },
          e("li", { className: "workflow-item" }, e("span", { className: "workflow-step" }, "Input")),
          e("li", { className: "workflow-item" }, e("span", { className: "workflow-step" }, "Content Analysis")),
          e("li", { className: "workflow-item" }, e("span", { className: "workflow-step" }, "Claim Identification")),
          e("li", { className: "workflow-item" }, e("span", { className: "workflow-step" }, "Evidence Analysis")),
          e("li", { className: "workflow-item" }, e("span", { className: "workflow-step" }, "Credibility Score"))
        ),
        e(
          "p",
          { className: "workflow-note" },
          "Advanced AI and ML components (including multimodal understanding, fact verification and advertisement detection) are planned for the next development stage. This prototype uses a mock analysis service."
        )
      )
    ),
    e(
      "section",
      { className: "section disclaimer-section" },
      e(
        "div",
        { className: "container narrow disclaimer-card" },
        e("h2", { className: "section-title" }, "DISCLAIMER"),
        e(
          "p",
          { className: "disclaimer-text" },
          "ClariFact AI provides an AI-generated credibility assessment. It should not be treated as an absolute determination of truth. Users should review available evidence and use independent judgment, especially for important decisions."
        )
      )
    )
  );
}
