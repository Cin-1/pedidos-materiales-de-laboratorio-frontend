import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  base: "/", // Cambia '/' si tu app está en un subdirectorio (ej. '/subdirectorio/')
  build: {
    outDir: "dist", // Carpeta de salida para la build
  },
  plugins: [react()],
});
