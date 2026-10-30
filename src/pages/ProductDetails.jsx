import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import "./ProductDetails.css";

// Small service highlights (same style as the home page strip)
const SERVICES = [
  { icon: "🚚", title: "Free Shipping", text: "On orders over $50" },
  { icon: "🛡️", title: "30-Day Returns", text: "Easy returns & refunds" },
  { icon: "🔒", title: "Secure Payments", text: "100% secure checkout" },
  { icon: "🎧", title: "24/7 Support", text: "We're here to help" },
];

// Product details page: shows one product based on the id in the URL (/product/:id)
export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  // Scroll to top when the user opens another product
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setQuantity(1);
    setAdded(false);
  }, [id]);

  // Clear the timer when leaving the page
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container details__notfound">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist or was removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 2000);
  };

  // Discount percentage (only if the product has an old price)
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Related products: same category first, then fill with others
  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  // Badge colour class (NEW = blue, BESTSELLER = green, SALE = red)
  const badgeClass = product.badge
    ? `details__badge details__badge--${product.badge.toLowerCase()}`
    : "";

  return (
    <section className="details">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="details__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <div className="details__grid">
          {/* Left: product image */}
          <div className="details__image">
            {product.badge && <span className={badgeClass}>{product.badge}</span>}
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <span className="details__emoji">{product.emoji}</span>
            )}
          </div>

          {/* Right: product information */}
          <div className="details__info">
            <span className="details__category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="details__subtitle">{product.subtitle}</p>

            <div className="details__price">
              <strong>${product.price.toFixed(2)}</strong>
              {product.oldPrice && (
                <>
                  <span className="details__old">${product.oldPrice.toFixed(2)}</span>
                  <span className="details__save">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="details__stock">
              <span className="details__dot" /> In stock · Ready to ship
            </p>

            <p className="details__description">{product.description}</p>

            {/* Quantity + Add to cart on one row */}
            <div className="details__actions">
              <div className="details__qty-box">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary details__btn"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
            </div>

            <p className={`details__added ${added ? "is-visible" : ""}`} role="status">
              {added ? "✓ Added to your cart" : ""}
            </p>

            {/* Service highlights */}
            <ul className="details__services">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <span className="details__service-icon">{s.icon}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <small>{s.text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <div className="details__related">
            <div className="details__related-head">
              <h2>You May Also Like</h2>
              <Link to="/">View All →</Link>
            </div>

            <div className="details__related-grid">
              {related.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="details__card">
                  <div className="details__card-img">
                    {p.image ? (
                      <img src={p.image} alt={p.name} />
                    ) : (
                      <span>{p.emoji}</span>
                    )}
                  </div>
                  <h3>{p.name}</h3>
                  <p>
                    <strong>${p.price.toFixed(2)}</strong>
                    {p.oldPrice && <s>${p.oldPrice.toFixed(2)}</s>}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
