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
      <Categories />
      <ProductList />
      <PromoBanner />
      <BannerPair />
    </div>
  );
}