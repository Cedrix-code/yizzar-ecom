import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solid({ ssr: true })],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});