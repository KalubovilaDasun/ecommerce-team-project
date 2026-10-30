import "./Categories.css";

// Category cards with a pastel background color each
const categories = [
  { name: "Audio Devices", emoji: "🎧", color: "#e9e6fb" },
  { name: "Smart Watches", emoji: "⌚", color: "#eceff1" },
  { name: "Power Solutions", emoji: "🔋", color: "#e6e9fb" },
  { name: "Drones & Cameras", emoji: "🚁", color: "#dff0fa" },
];

export default function Categories() {
  return (
    <section className="categories">
      <div className="container categories__grid">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#top-picks"
            className="category-card"
            style={{ background: cat.color }}
          >
            <div className="category-card__text">
              <h3>{cat.name}</h3>
              <span className="category-card__link">Shop Now →</span>
            </div>
            <span className="category-card__emoji">{cat.emoji}</span>
          </a>
        ))}
      </div>
    </section>
  );
}