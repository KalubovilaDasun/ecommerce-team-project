import Hero from "../components/Hero.jsx";
import FeatureBar from "../components/FeatureBar.jsx";
import Categories from "../components/Categories.jsx";
import ProductList from "../components/ProductList.jsx";
import PromoBanner from "../components/PromoBanner.jsx";
import BannerPair from "../components/BannerPair.jsx";
import "./Home.css";

// Home page: assembles all sections from top to bottom.
// (Header and Footer are rendered once in App.jsx)
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <FeatureBar />
      
      <section id="shop">
        <Categories />
        <ProductList />
      </section>
      
      <section id="new-arrivals">
        <PromoBanner />
      </section>
      
      <section id="top-picks">
        <BannerPair />
      </section>
    </div>
  );
}