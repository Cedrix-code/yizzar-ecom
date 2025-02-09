import { cart, removeFromCart, clearCart, totalPrice } from "~/store";

const API_URL = import.meta.env.VITE_API_URL;

export default function Checkout() {
  const handleOrder = async () => {
    const order = { items: cart(), total: totalPrice() };

    const response = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      clearCart();
    } else {
      alert("Failed to place order.");
    }
  };

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
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}
