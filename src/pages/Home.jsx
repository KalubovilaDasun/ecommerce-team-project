import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import FeatureBar from "../components/FeatureBar.jsx";
import Categories from "../components/Categories.jsx";
import ProductList from "../components/ProductList.jsx";
import PromoBanner from "../components/PromoBanner.jsx";
import BannerPair from "../components/BannerPair.jsx";
import "./Home.css";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="home">
      <Hero />
      <FeatureBar />
      
      <section id="shop" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <Categories />
        <ProductList />
      </section>
      
      <section id="new-arrivals" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <PromoBanner />
      </section>
      
      <section id="top-picks" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <BannerPair />
      </section>
    </div>
  );
}