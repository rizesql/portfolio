import { defineCollection, reference, z } from "astro:content";

import { content } from "../base-content";

export const articles = defineCollection({
	type: "content",
	schema: content.extend({
		date: z.date({ coerce: true }),
		topic: reference("topics"),
	}),
});
