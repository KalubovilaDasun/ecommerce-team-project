import { useState } from "react";
import "./Newsletter.css";

// Newsletter sign-up strip (demo only, nothing is sent to a server)
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__box">
          <div className="newsletter__text">
            <span className="newsletter__icon">✉️</span>
            <div>
              <h3>Join Our Newsletter</h3>
              <p>Get the latest updates, offers &amp; new arrivals.</p>
            </div>
          </div>

          {subscribed ? (
            <p className="newsletter__thanks">Thanks for subscribing! 🎉</p>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}