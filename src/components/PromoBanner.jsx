import "./PromoBanner.css";

// Wide dark banner: "Boost Your Productivity"
export default function PromoBanner() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__box">
          <div className="promo__content">
            <span className="promo__eyebrow">WORK SMART, PLAY HARD</span>
            <h2>Boost Your Productivity</h2>
            <p>Essential tech for work, study &amp; entertainment.</p>
            <a href="#top-picks" className="promo__btn">
              Shop Accessories →
            </a>
          </div>
          <div className="promo__visual">💻 ⌨️ 🖱️</div>
        </div>
      </div>
    </section>
  );
}