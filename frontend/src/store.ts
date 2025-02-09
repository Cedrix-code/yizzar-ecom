import { createSignal } from "solid-js";

// Check if window exists to handle SSR
const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const [cart, setCart] = createSignal(getInitialCart());

const saveCart = (items) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
  setCart(items);
};

export const addToCart = (item) => {
  const items = [...cart(), item];
  saveCart(items);
};

export const removeFromCart = (id) => {
  const items = cart().filter(item => item.id !== id);
  saveCart(items);
};

export const clearCart = () => {
  saveCart([]);
};

export const totalPrice = () => {
  return cart().reduce((sum, item) => sum + item.price, 0);
};

export { cart };
