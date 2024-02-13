/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"foreground-subtle": "var(--foreground-subtle)",
				surface: "var(--surface)",
				brand: "var(--brand)",
			},
			fontFamily: {
				"overused-grotesk": "var(--font-overused-grotesk)",
			},
		},
	},
	plugins: [],
};
