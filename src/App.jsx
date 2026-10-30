import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
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
          <Route path="/checkout" element={<Checkout />} />
          {/* අලුත් පිටු 2 සඳහා Routes ලබා දීම */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}