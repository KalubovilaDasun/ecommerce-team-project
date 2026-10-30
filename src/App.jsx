import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Profile from "./pages/Profile.jsx";

// Root component: shared layout (header + footer) and page routes.
export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Cart පිටුව සඳහා Route එක */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* අලුත් පිටු 2 සඳහා Routes ලබා දීම */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}