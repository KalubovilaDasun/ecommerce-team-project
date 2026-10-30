import "./FeatureBar.css";

// Four service highlights shown under the hero
const features = [
  { icon: "🚚", title: "Free Shipping", text: "On orders over $50" },
  { icon: "🛡️", title: "30-Day Returns", text: "Easy returns & refunds" },
  { icon: "🏅", title: "Secure Payments", text: "100% secure checkout" },
  { icon: "🎧", title: "24/7 Support", text: "We're here to help" },
];

export default function FeatureBar() {
  return (
    <section className="features">
      <div className="container features__inner">
        {features.map((f) => (
          <div key={f.title} className="features__item">
            <span className="features__icon">{f.icon}</span>
            <div>
              <strong className="features__title">{f.title}</strong>
              <span className="features__text">{f.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}