import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "VITE");
  const apiTarget = env.VITE_API_URL || "http://localhost:8000";

  return {
    // Tell Vite to look for the .env file in the root folder (TuneLog/)
    envDir: "../",

    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],

    server: {
      proxy: {
        "/api":   { target: apiTarget, changeOrigin: true },
        "/auth":  { target: apiTarget, changeOrigin: true },
        "/admin": { target: apiTarget, changeOrigin: true },
      },
    },
  };
});