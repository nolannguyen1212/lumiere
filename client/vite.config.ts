import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: true,
  },
});
