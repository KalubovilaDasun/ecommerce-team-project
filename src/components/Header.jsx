import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Header.css";

// Navigation links shown in the top bar
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/#top-picks" },
  { label: "New Arrivals", to: "/#new-arrivals" },
  { label: "Top Deals", to: "/#top-picks" },
  { label: "Brands", to: "/" },
  { label: "Blog", to: "/" },
  { label: "Contact", to: "/" },
];

export default function Header() {
  // Cart badge number comes from the shared cart context
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">⬢</span>
          GizmoHub
        </Link>

        {/* Main navigation */}
        <nav className="header__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              className={({ isActive }) =>
                "header__link" +
                (isActive && link.label === "Home" ? " header__link--active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side icons: search, account, cart */}
        <div className="header__icons">
          <button className="header__icon" aria-label="Search">
            🔍
          </button>
          <button className="header__icon" aria-label="Account">
            👤
          </button>
          <Link to="/cart" className="header__icon header__cart" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}