import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";

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
  plugins: [
    react(),
    {
      name: "configure-server",
      configureServer: (server) => {
        server.middlewares.use(
          history({
            disableDotRule: true,
            verbose: true,
          }),
        );
      },
    },
  ],
  server: {
    middlewareMode: true,
  },
});
