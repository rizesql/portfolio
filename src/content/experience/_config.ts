import { defineCollection, z } from "astro:content";

import { content } from "../base-content";
import { period } from "~/lib/period";

export const experience = defineCollection({
	type: "content",
	schema: content.extend({
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
	}),
});
