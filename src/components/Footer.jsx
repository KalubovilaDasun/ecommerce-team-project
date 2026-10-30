import Newsletter from "./Newsletter.jsx";
import "./Footer.css";

// Footer link columns
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
      {/* Newsletter sits right above the dark footer */}
      <Newsletter />

      <footer className="footer">
        <div className="container footer__grid">
          {/* Brand block */}
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

          {/* Link columns */}
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

          {/* App download buttons */}
          <div className="footer__col">
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

        <p className="footer__copy">© 2026 GizmoHub. All Rights Reserved.</p>
      </footer>
    </>
  );
}