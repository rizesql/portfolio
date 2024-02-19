import { defineCollection, z } from "astro:content";

export const projects = defineCollection({
	type: "content",
	schema: z.object({
		name: z.string(),
		subtitle: z.string(),
		color: z.string(),
		foreground: z.enum(["light", "dark"]).or(z.string()),
		invertHeading: z.boolean().default(false),
	}),
});
