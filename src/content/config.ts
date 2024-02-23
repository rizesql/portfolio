import { defineCollection, z } from "astro:content";

import { articles } from "./articles/_config";
import { experience } from "./experience/_config";
import { projects } from "./projects/_config";
import { topics } from "./topics/_config";

export const collections = {
	articles,
	experience,
	projects,
	focus: defineCollection({
		type: "data",
		schema: z.object({
			focus: z.array(z.string()),
		}),
	}),
	topics,
};
