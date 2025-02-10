import { cart, removeFromCart, clearCart, totalPrice } from "~/store/index";
import { loadStripe } from "@stripe/stripe-js";
import { isAuthenticated } from "~/auth";
import { useNavigate } from "@solidjs/router";


const stripePromise = loadStripe("pk_test_51QqyTvFJu8npj8tJZDrXQagF9f7Fdf6ELDm5CVFynoKfLkWHeTFkM3A4ckKjcnm39b7GIU1F1ieVoMobU97kywpR00XXVIOlXx");

export default function Checkout() {
  const handleOrder = async () => {
    const stripe = await stripePromise;
    const order = { items: cart(), total: totalPrice() };

    const response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
      clearCart();
    } else {
      alert("Failed to place order: " + data.error);
    }
  };

  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/login");
    return null;
  }

  return (
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-6">🛒 Checkout</h1>

      {cart().length === 0 ? (
        <p class="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul class="mb-4">
            {cart().map((item) => (
              <li class="flex justify-between items-center border-b py-2" key={item.id}>
                <span>{item.name} - ${item.price}</span>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item.id)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <p class="font-semibold">Total: ${totalPrice()}</p>
          <button class="mt-4 bg-green-500 text-white px-6 py-2 rounded" onClick={handleOrder}>
            Pay with Stripe
          </button>
        </>
      )}
    </div>
  );
}
