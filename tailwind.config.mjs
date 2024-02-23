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
				"writing-background": "var(--writing-background)",
				"writing-foreground": "var(--writing-foreground)",
			},
			fontFamily: {
				"overused-grotesk": "var(--font-overused-grotesk)",
				"zed-mono": "var(--font-zed-mono)",
			},
			screens: {
				touch: { raw: "(pointer: coarse)" },
			},
			typography: {
				foreground: {
					css: {
						"--tw-prose-body": "var(--foreground)",
						"--tw-prose-headings": "var(--foreground)",
						"--tw-prose-lead": "var(--foreground)",
						"--tw-prose-links": "var(--foreground)",
						"--tw-prose-bold": "var(--foreground)",
						"--tw-prose-counters": "var(--foreground)",
						"--tw-prose-bullets": "var(--foreground)",
						"--tw-prose-hr": "var(--foreground)",
						"--tw-prose-quotes": "var(--foreground)",
						"--tw-prose-quote-borders": "var(--foreground)",
						"--tw-prose-captions": "var(--foreground)",
						"--tw-prose-code": "var(--foreground)",
						"--tw-prose-pre-code": "var(--foreground)",
						"--tw-prose-pre-bg": "var(--foreground)",
						"--tw-prose-th-borders": "var(--foreground)",
						"--tw-prose-td-borders": "var(--foreground)",
						"--tw-prose-invert-body": "var(--foreground)",
						"--tw-prose-invert-headings": "var(--foreground)",
						"--tw-prose-invert-lead": "var(--foreground)",
						"--tw-prose-invert-links": "var(--foreground)",
						"--tw-prose-invert-bold": "var(--foreground)",
						"--tw-prose-invert-counters": "var(--foreground)",
						"--tw-prose-invert-bullets": "var(--foreground)",
						"--tw-prose-invert-hr": "var(--foreground)",
						"--tw-prose-invert-quotes": "var(--foreground)",
						"--tw-prose-invert-quote-borders": "var(--foreground)",
						"--tw-prose-invert-captions": "var(--foreground)",
						"--tw-prose-invert-code": "var(--foreground)",
						"--tw-prose-invert-pre-code": "var(--foreground)",
						"--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
						"--tw-prose-invert-th-borders": "var(--foreground)",
						"--tw-prose-invert-td-borders": "var(--foreground)",
					},
				},
			},
			animation: {
				"fade-in": "fade-in 980ms ease-out 500ms 1 normal both",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: 0,
					},
					"100%": {
						opacity: 1,
					},
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require("@tailwindcss/typography")],
};
