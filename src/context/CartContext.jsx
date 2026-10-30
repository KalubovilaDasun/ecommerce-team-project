import { createContext, useContext, useState, useEffect } from "react";

// Create the Cart Context
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize cart items from localStorage, falling back to an empty array
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("cart_items");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });

  // Synchronize cart items with localStorage whenever the items array changes
  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [items]);

  // Add a product to the cart or increment its quantity if it already exists
  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // Remove a product completely from the cart by its ID
  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity; remove the item if the quantity drops below 1
  const updateQuantity = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  // Clear all items from the cart (used after completing checkout)
  const clearCart = () => {
    setItems([]);
  };

  // Total count of individual items (displayed on the cart badge)
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  // Total price calculation of all items in the cart
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook allowing components to easily access cart state and functions
export function useCart() {
  return useContext(CartContext);
}