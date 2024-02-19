import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [
		tailwind(),
		solidJs(),
		mdx({ syntaxHighlight: "shiki", shikiConfig: { theme: "catppuccin-mocha" } }),
	],
});
