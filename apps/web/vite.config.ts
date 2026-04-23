import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor-react";
          }
          if (
            id.includes("node_modules/antd/") ||
            id.includes("node_modules/@ant-design/icons/")
          ) {
            return "vendor-antd";
          }
        },
      },
    },
  },
});
