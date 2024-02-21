import { defineCollection, z } from "astro:content";

import { content } from "../base-content";

export const projects = defineCollection({
	type: "content",
	schema: content.extend({
		color: z.string(),
		foreground: z.enum(["light", "dark"]).or(z.string()),
		invertHeading: z.boolean().default(false),
		order: z.number().positive(),
	}),
});
