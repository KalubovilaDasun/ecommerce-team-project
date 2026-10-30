import { createContext, useContext, useState } from "react";

// Shared cart state.
// Member 1 created this small starter so everyone uses the same API.
// Member 3 (Cart) can extend it (e.g. quantity change, clear cart, localStorage).

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Each item looks like: { ...product, qty: number }
  const [items, setItems] = useState([]);

  // Add a product, or increase its quantity if it is already in the cart
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove a product completely from the cart
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Total number of items (shown as the badge on the cart icon)
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so components can simply call useCart()
export function useCart() {
  return useContext(CartContext);
}