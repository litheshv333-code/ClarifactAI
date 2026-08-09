function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const current = route || "home";
  const close = () => setOpen(false);

  return e(
    "header",
    { className: "navbar" },
    e(
      "div",
      { className: "container navbar-inner" },
      e("a", { href: "#/", className: "brand", onClick: close }, "CLARIFACT ", e("span", null, "AI")),
      e(
        "nav",
        { className: `nav-menu ${open ? "open" : ""}` },
        navLink("#/", "Home", current === "home", close),
        navLink("#/verify", "Verify", current === "verify", close),
        navLink("#/about", "About Us", current === "about", close),
        e("a", { href: "#/verify", className: "btn btn-accent nav-cta", onClick: close }, "Verify Now")
      ),
      e(
        "button",
        {
          className: "nav-toggle",
          type: "button",
          "aria-label": "Toggle menu",
          "aria-expanded": open,
          onClick: () => setOpen((v) => !v),
        },
        open ? "✕" : "☰"
      )
    )
  );
}

function navLink(href, text, active, onClose) {
  return e(
    "a",
    { href, className: active ? "nav-link active" : "nav-link", onClick: onClose },
    text
  );
}
