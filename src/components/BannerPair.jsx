import "./BannerPair.css";

// Two side-by-side banners: New Arrivals and Best Sellers
export default function BannerPair() {
  return (
    <section className="pair" id="new-arrivals">
      <div className="container pair__grid">
        {/* Left banner */}
        <div className="pair__card pair__card--blue">
          <div>
            <h3>New Arrivals</h3>
            <p>Explore the latest tech essentials.</p>
            <a href="#top-picks">Shop New →</a>
          </div>
          <span className="pair__emoji">🥽</span>
        </div>

        {/* Right banner */}
        <div className="pair__card pair__card--green">
          <div>
            <h3>Best Sellers</h3>
            <p>Shop our most popular picks.</p>
            <a href="#top-picks">Shop Bestsellers →</a>
          </div>
          <span className="pair__emoji">🎧</span>
        </div>
      </div>
    </section>
  );
}