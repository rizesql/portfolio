import { z } from "zod";

export const period = z.object({
	start: z.date({ coerce: true }),
	end: z.date({ coerce: true }),
});

export type Period = z.infer<typeof period>;

export const isPeriod = (value: unknown): value is Period => {
	return period.safeParse(value).success;
};
