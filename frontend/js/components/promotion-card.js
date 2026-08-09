function Meter({ label, value }) {
  return e(
    "div",
    { className: "promo-meter" },
    e(
      "div",
      { className: "promo-meter-head" },
      e("span", null, label),
      e("span", null, `${value}%`)
    ),
    e(
      "div",
      { className: "promo-meter-track" },
      e("div", { className: "promo-meter-fill", style: { width: `${value}%` } })
    )
  );
}

function PromotionCard({ promotion }) {
  const disclosure = promotion.disclosure || "Not Detected";
  const disclosureClass = disclosure === "Detected" ? "detected" : "not-detected";

  return e(
    "div",
    { className: "promotion-card reveal" },
    e(Meter, { label: "Promotional Content", value: promotion.promotional_content || 0 }),
    e(Meter, { label: "Advertisement Probability", value: promotion.advertisement_probability || 0 }),
    e(
      "div",
      { className: "promo-disclosure" },
      e("span", { className: "promo-disclosure-label" }, "Disclosure"),
      e("span", { className: `disclosure-badge ${disclosureClass}` }, disclosure)
    ),
    e(
      "p",
      { className: "promo-note" },
      "Potential promotional content detected. This is a mock assessment for Stage 1 and does not confirm that anyone is being paid."
    )
  );
}
