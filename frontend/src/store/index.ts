import { createSignal, createEffect } from "solid-js";

const storedCart = localStorage.getItem("cart");
const [cart, setCart] = createSignal(JSON.parse(storedCart || "[]"));

createEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart()));
});

const addToCart = (product) => setCart([...cart(), product]);

const removeFromCart = (id) => setCart(cart().filter((item) => item.id !== id));

const clearCart = () => setCart([]);

const totalPrice = () => cart().reduce((sum, item) => sum + item.price, 0);

export { cart, addToCart, removeFromCart, clearCart, totalPrice };
