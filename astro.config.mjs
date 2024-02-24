import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import metaTags from "astro-meta-tags";
import svgSprite from "astro-svg-sprite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "http://localhost:4321",
	integrations: [
		tailwind(),
		solidJs(),
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: {
				theme: "catppuccin-mocha",
			},
		}),
		sitemap(),
		metaTags(),
		svgSprite({
			include: "./src/assets/icons",
			emitFile: {
				compress: "best",
			},
		}),
	],
});
