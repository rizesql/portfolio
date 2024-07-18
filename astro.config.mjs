import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import playformInline from "@playform/inline";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import { transformerNotationHighlight } from "@shikijs/transformers";
import compressor from "astro-compressor";
import { transformerTwoslash } from "@shikijs/twoslash";

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
				theme: "catppuccin-macchiato",
				transformers: [transformerNotationHighlight(), transformerTwoslash()],
			},
		}),
		sitemap(),
		metaTags(),
		playformInline(),
		compressor(),
	],

	vite: {
		build: {
			cssMinify: "lightningcss",
		},
	},
});
