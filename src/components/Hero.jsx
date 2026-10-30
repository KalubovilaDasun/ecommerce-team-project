import { useState, useEffect } from "react";
import "./Hero.css";

// Hero slides (text + emoji cluster as the visual)
const slides = [
  {
    eyebrow: "UPGRADE YOUR LIFE",
    title: ["Smart Tech.", "Better Everyday."],
    text: "Discover innovative gadgets and accessories built for performance and style.",
    visual: ["📱", "🎧", "⌚"],
  },
  {
    eyebrow: "NEW SEASON",
    title: ["Sound That", "Moves You."],
    text: "Premium headphones and earbuds with deep bass and all-day battery.",
    visual: ["🎧", "🔊", "🎵"],
  },
  {
    eyebrow: "LIMITED OFFER",
    title: ["Power Up.", "Save More."],
    text: "Grab the best deals on chargers, power banks and smart accessories.",
    visual: ["🔋", "⚡", "📱"],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-play: move to the next slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer); // cleanup when the component unmounts
  }, []);

  const slide = slides[current];

  return (
    <section className="hero">
      <div className="container hero__inner">
        {/* Left side: text content */}
        <div className="hero__content">
          <span className="hero__eyebrow">{slide.eyebrow}</span>
          <h1 className="hero__title">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <p className="hero__text">{slide.text}</p>
          <a href="#top-picks" className="btn btn-primary">
            Explore Now →
          </a>
        </div>

        {/* Right side: product visual on a glowing podium */}
        <div className="hero__visual">
          <div className="hero__glow" />
          <div className="hero__items">
            {slide.visual.map((icon, i) => (
              <span key={i} className={`hero__item hero__item--${i}`}>
                {icon}
              </span>
            ))}
          </div>
          <div className="hero__podium" />
        </div>
      </div>

      {/* Slider dots */}
      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={"hero__dot" + (i === current ? " hero__dot--active" : "")}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}