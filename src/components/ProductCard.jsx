import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./ProductCard.css";

// Maps a badge text to a CSS modifier so each badge gets its own color
const badgeClass = {
  NEW: "badge--new",
  BESTSELLER: "badge--best",
  SALE: "badge--sale",
};

// A single product card used in the product list.
// Clicking the image/name opens the details page (built by Member 2).
export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      {/* Optional badge (NEW / BESTSELLER / SALE) */}
      {product.badge && (
        <span className={`badge ${badgeClass[product.badge]}`}>{product.badge}</span>
      )}

      {/* Product image (falls back to the emoji placeholder) */}
      <Link to={`/product/${product.id}`} className="product-card__image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span className="product-card__emoji">{product.emoji}</span>
        )}
      </Link>

      {/* Name and subtitle */}
      <Link to={`/product/${product.id}`} className="product-card__name">
        {product.name}
        <br />
        {product.subtitle}
      </Link>

      {/* Price (with old price for sale items) */}
      <div className="product-card__price">
        <strong>${product.price.toFixed(2)}</strong>
        {product.oldPrice && (
          <span className="product-card__old">${product.oldPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Add to cart button */}
      <button
        className="btn btn-primary product-card__btn"
        onClick={() => addToCart(product)}
      >
        🛒 Add to Cart
      </button>
    </article>
  );
}