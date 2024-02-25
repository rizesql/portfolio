import { defineCollection, z } from "astro:content";

import { period } from "../../lib/period";
import { content } from "../base-content";

const schema = content.extend({
	/**
	 * Represents either a period between two dates in format `year-month`, or just a year.
	 *
	 * @example
	 *
	 * ```tsx
	 * const period: Period = {
	 *  start: new Date("2023-02"),
	 *  end: new Date("2023-05")
	 * };
	 * const year: Period = 2023;
	 * ```
	 */
	period: period.or(z.number()),
});

export const experience = defineCollection({
	type: "content",
	schema,
});

export type Experience = z.infer<typeof schema>;
