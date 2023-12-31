import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // base: './',
  plugins: [react(), tsconfigPaths()],
  define: {
    global: {},
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://10.0.16.245:8000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  }
});
