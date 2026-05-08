import path from "path"

import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
	base: "./",
	plugins: [tailwindcss(), svelte()],
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib")
		}
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "[name]-[hash].js",
				chunkFileNames: "[name]-[hash].js",
				assetFileNames: "[name]-[hash].[ext]"
			}
		}
	}
})
