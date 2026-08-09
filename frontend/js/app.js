const e = React.createElement;
const Fragment = React.Fragment;
const { useState, useEffect, useRef } = React;

function getRoute() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "/") return "home";
  const normalized = hash.startsWith("/") ? hash.slice(1) : hash;
  return normalized || "home";
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return e(
    "div",
    { className: "app" },
    e(Navbar, { route }),
    e(
      "main",
      { className: "main" },
      route === "verify"
        ? e(VerifyPage)
        : route === "about"
        ? e(AboutPage)
        : e(HomePage)
    ),
    e(Footer)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(e(App));
