import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Cart.css";

// Free shipping limit and flat shipping cost (same rule as the home page banner)
const FREE_SHIPPING_LIMIT = 50;
const SHIPPING_COST = 5.99;

// Cart page: list of items, change quantity, remove, and order summary
export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Shipping is free for orders over $50
  const shipping = cartTotal >= FREE_SHIPPING_LIMIT || cartTotal === 0 ? 0 : SHIPPING_COST;
  const total = cartTotal + shipping;

  // Empty cart view
  if (items.length === 0) {
    return (
      <section className="cart">
        <div className="container cart__empty">
          <span className="cart__empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you have not added anything yet.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <div className="container">
        <h1 className="cart__title">Shopping Cart</h1>

        <div className="cart__layout">
          {/* Left: list of cart items */}
          <div className="cart__items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product picture (emoji or image) */}
                <div className="cart-item__image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </div>

                {/* Name and unit price */}
                <div className="cart-item__info">
                  <Link to={`/product/${item.id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <span className="cart-item__sub">{item.subtitle}</span>
                  <span className="cart-item__price">${item.price.toFixed(2)}</span>
                </div>

                {/* Quantity buttons */}
                <div className="cart-item__qty">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <strong className="cart-item__total">
                  ${(item.price * item.qty).toFixed(2)}
                </strong>

                {/* Remove button */}
                <button
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Right: order summary */}
          <aside className="cart__summary">
            <h2>Order Summary</h2>
            <div className="cart__row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart__row cart__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary cart__checkout">
              Proceed to Checkout
            </Link>
            <Link to="/" className="cart__continue">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}