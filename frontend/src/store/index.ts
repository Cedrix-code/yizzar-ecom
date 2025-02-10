import { createSignal, createEffect } from "solid-js";

// Check if we're in browser environment
const isClient = typeof window !== 'undefined';

// Initialize cart from localStorage only on client-side
const getInitialCart = () => {
  if (isClient) {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const [cart, setCart] = createSignal(getInitialCart());

// Only sync to localStorage on client-side
if (isClient) {
  createEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart()));
  });
}

const addToCart = (product) => setCart([...cart(), product]);
const removeFromCart = (id) => setCart(cart().filter((item) => item.id !== id));
const clearCart = () => setCart([]);
const totalPrice = () => cart().reduce((sum, item) => sum + item.price, 0);

export { cart, addToCart, removeFromCart, clearCart, totalPrice };
