import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
 HEAD
import ProductDetails from "./pages/ProductDetails.jsx";

import Checkout from "./pages/Checkout.jsx";
// අලුත් පිටු 2 import කිරීම
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";


// Root component: shared layout (header + footer) and page routes.
export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
< HEAD
         Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/checkout" element={<Checkout />} />
          {/* අලුත් පිටු 2 සඳහා Routes ලබා දීම */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
 bae59ae5f04b60abb1a231aed8f1a2dc7bd9df62
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}