import { z } from "astro/zod";

export const content = z.object({
	name: z.string(),
	/**
	 * Represents a small copy (2-3 words) that appears under the title
	 */
	subtitle: z.string(),
	/**
	 * Represents a paragraph that appears next to the title and is more descriptive
	 */
	description: z.string(),
});

export type Content = z.infer<typeof content>;
