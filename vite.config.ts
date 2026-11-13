import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://onlycatfan.github.io/polish/
export default defineConfig({
  base: "/polish/",
  plugins: [react()],
});
