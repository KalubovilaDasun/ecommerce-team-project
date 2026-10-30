import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";


// Root component: shared layout (header + footer) and page routes.
// Teammates add their routes below when their feature is ready:
//   Member 2 -> <Route path="/product/:id" element={<ProductDetails />} />
//   Member 3 -> <Route path="/cart" element={<Cart />} />
//   Member 4 -> <Route path="/checkout" element={<Checkout />} />
export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}