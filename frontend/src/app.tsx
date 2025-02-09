import { Router } from "@solidjs/router";
import { Routes } from "./routes";
import "./styles/app.css";

export default function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}