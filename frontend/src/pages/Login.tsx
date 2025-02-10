import { createSignal } from "solid-js";
import { login } from "./auth";
import { useNavigate } from "@solidjs/router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = async () => {
    await login(email(), password());
    navigate("/");
  };

  return (
    <div class="p-6 max-w-sm mx-auto">
      <h1 class="text-2xl font-bold">🔐 Login</h1>
      <input type="email" placeholder="Email" class="border p-2 w-full my-2" onInput={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" class="border p-2 w-full my-2" onInput={(e) => setPassword(e.target.value)} />
      <button class="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
}
