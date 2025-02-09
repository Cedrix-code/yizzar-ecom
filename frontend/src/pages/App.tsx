import { addToCart, cart, removeFromCart, clearCart, totalPrice } from "~/store";
import { useNavigate } from "@solidjs/router";

const products = [
  { id: 1, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jeans", price: 50, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Jacket", price: 80, image: "https://via.placeholder.com/150" },
];

export default function App() {
  const navigate = useNavigate();

  return (
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-6">🛍️ SolidJS Clothing Store</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div class="border p-4 rounded-lg shadow-lg text-center" key={product.id}>
            <img src={product.image} alt={product.name} class="w-full h-32 object-cover mb-2 rounded" />
            <h2 class="text-xl font-semibold">{product.name}</h2>
            <p class="text-gray-600">${product.price}</p>
            <button
               class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        class="mt-6 bg-green-500 text-white px-6 py-2 rounded block mx-auto"
        onClick={() => navigate("/checkout")}
      >
        Go to Checkout
      </button>
    </div>
  );
}
