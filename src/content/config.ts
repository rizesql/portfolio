import { defineCollection, z } from "astro:content";

import { experience } from "./experience/_config";
import { projects } from "./projects/_config";

export const collections = {
	experience,
	projects,
	focus: defineCollection({
		type: "data",
		schema: z.object({
			focus: z.array(z.string()),
		}),
	}),
};
