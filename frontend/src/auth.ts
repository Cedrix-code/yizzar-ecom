import { createSignal } from "solid-js";
import { jwtDecode } from "jwt-decode";

const isClient = typeof window !== 'undefined';

const getInitialToken = () => {
  if (isClient) {
    return localStorage.getItem("token");
  }
  return null;
};

const [token, setToken] = createSignal(getInitialToken());

export const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    if (isClient) {
      localStorage.setItem("token", data.token);
    }
    setToken(data.token);
  } else {
    throw new Error("Login failed");
  }
};

export const logout = () => {
  if (isClient) {
    localStorage.removeItem("token");
  }
  setToken(null);
};

export const isAuthenticated = () => !!token();

export const getUser = () => {
  const currentToken = token();
  return currentToken ? jwtDecode(currentToken) : null;
};
