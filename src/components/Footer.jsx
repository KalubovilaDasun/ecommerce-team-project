import Newsletter from "./Newsletter.jsx";
import "./Footer.css";

// Data array for dynamically rendering footer link columns
const columns = [
  {
    title: "Shop",
    links: ["All Products", "New Arrivals", "Top Deals", "Accessories", "Gift Cards"],
  },
  {
    title: "Customer Service",
    links: ["Shipping Info", "Returns & Refunds", "Track Your Order", "FAQs", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Blog", "Careers", "Privacy Policy", "Terms of Service"],
  },
];

export default function Footer() {
  return (
    <>
      {/* Newsletter component placed directly above the footer */}
      <Newsletter />

      {/* Main dark footer section */}
      <footer className="footer">
        <div className="container footer__grid">
          
          {/* Brand Information Section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span>⬢</span> GizmoHub
            </div>
            <p>Your trusted destination for premium tech gadgets and accessories.</p>
            <div className="footer__social">
              {["f", "𝕏", "▶", "◎"].map((s) => (
                <a key={s} href="#" className="footer__social-icon">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns Generation */}
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile App Download Buttons Section */}
          <div className="footer__col footer__app-links">
            <h4>Download Our App</h4>
            <a href="#" className="footer__store">
              <small>Download on the</small>
              App Store
            </a>
            <a href="#" className="footer__store">
              <small>GET IT ON</small>
              Google Play
            </a>
          </div>
          
        </div>

        {/* Copyright Notice */}
        <p className="footer__copy">© 2026 GizmoHub. All Rights Reserved.</p>
      </footer>
    </>
  );
}