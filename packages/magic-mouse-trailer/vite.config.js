import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "script.js",
        chunkFileNames: "script.js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names && assetInfo.names[0];
          if (name && name.endsWith(".css")) {
            return "style.css";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
