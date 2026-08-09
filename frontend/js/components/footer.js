function Footer() {
  return e(
    "footer",
    { className: "footer" },
    e(
      "div",
      { className: "container footer-inner" },
      e(
        "div",
        { className: "footer-brand" },
        e("span", { className: "brand" }, "CLARIFACT ", e("span", null, "AI")),
        e("p", { className: "footer-tagline" }, "Verify Before You Believe.")
      ),
      e(
        "nav",
        { className: "footer-nav", "aria-label": "Footer" },
        e("a", { href: "#/" }, "Home"),
        e("a", { href: "#/verify" }, "Verify"),
        e("a", { href: "#/about" }, "About Us")
      )
    ),
    e(
      "div",
      { className: "container footer-bottom" },
      e(
        "p",
        null,
        "© 2026 ClariFact AI. Stage 1 prototype — analysis is currently mocked."
      )
    )
  );
}
