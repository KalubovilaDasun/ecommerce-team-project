import products from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import "./ProductList.css";

// "Top Picks" section: title row + grid of product cards
export default function ProductList() {
  return (
    <section className="product-list" id="top-picks">
      <div className="container">
        <div className="product-list__head">
          <h2>Top Picks</h2>
          <a href="#top-picks" className="product-list__viewall">
            View All →
          </a>
        </div>

        {/* Render one card for every product in the data file */}
        <div className="product-list__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}