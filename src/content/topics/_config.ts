import { defineCollection, z } from "astro:content";

export const topics = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
	}),
});
