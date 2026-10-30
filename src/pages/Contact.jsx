import { useState } from "react";
import "./Contact.css";

// Where the form details are delivered
const WHATSAPP_NUMBER = "94779475640"; // 0779475640 in international format (Sri Lanka)
const EMAIL_TO = "dasuntharinda03@gmail.com";

// Small inline SVG icons (no extra library needed)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

// Empty form values
const emptyForm = { name: "", email: "", phone: "", message: "" };

// Contact page: info card on the left, contact form on the right
export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  // Update one field while the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation: returns an object of error messages
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (form.phone && !/^[0-9+\s-]{7,15}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number";
    if (!form.message.trim()) newErrors.message = "Please write your message";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("sending");

    // 1) Open WhatsApp with the details already typed in the chat box.
    const text =
      `*New message from GizmoHub*\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "-"}\n\n` +
      `Message: ${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    // 2) Send the same details to the email address using FormSubmit
    fetch(`https://formsubmit.co/ajax/${EMAIL_TO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || "-",
        message: form.message,
        _subject: "New GizmoHub contact message",
        _template: "table",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Email failed");
        setStatus("sent");
        setForm(emptyForm);
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section className="contact">
      <div className="container">
        <div className="contact__head">
          <span className="contact__eyebrow">CONTACT US</span>
          <h1>We would love to hear from you</h1>
        </div>

        <div className="contact__grid">
          {/* Left: contact info card */}
          <div className="glass contact__info">
            <h2>Get in Touch</h2>
            <p>
              Have a question about an order or a product? Send us a message and
              our team will reply as soon as possible.
            </p>

            <ul className="contact__list">
              <li>
                <MailIcon />
                <a href={`mailto:${EMAIL_TO}`}>{EMAIL_TO}</a>
              </li>
              <li>
                <HomeIcon />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li>
                <PhoneIcon />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  +94 77 947 5640 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Right: contact form card */}
          <form className="glass contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <input
                name="name"
                placeholder="Your Name*"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="contact__field">
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="contact__field">
              <input
                name="phone"
                placeholder="Phone Number (Optional)"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <div className="contact__field">
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <small>{errors.message}</small>}
            </div>

            <button
              type="submit"
              className="contact__send"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {/* Result messages */}
            {status === "sent" && (
              <p className="contact__status contact__status--ok">
                ✓ Message sent! WhatsApp opened too. Press send there to finish.
              </p>
            )}
            {status === "error" && (
              <p className="contact__status contact__status--err">
                Email could not be sent, but WhatsApp was opened. Please press send there.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}