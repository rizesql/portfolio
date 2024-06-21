import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import metaTags from "astro-meta-tags";
import svgSprite from "astro-svg-sprite";
import { defineConfig } from "astro/config";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "https://rizesql.pages.dev",
	// site: "http://localhost:4321",
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		solidJs(),
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: {
				theme: "catppuccin-mocha",
			},
		}),
		sitemap(),
		metaTags(),
		// svgSprite({
		// 	include: "./src/assets/icons",
		// 	emitFile: {
		// 		compress: "best",
		// 	},
		// }),
		playformInline(),
		playformCompress({
			Image: false,
			CSS: false,
		}),
		compressor(),
	],

	vite: {
		build: {
			cssMinify: "lightningcss",
		},
	},
});
