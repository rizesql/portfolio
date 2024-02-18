import { compose, cva } from "~/lib/cx";

export const center = cva({
	base: "flex-row items-center justify-center",
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

export const flex = cva({
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
		direction: {
			row: "flex-row",
			col: "flex-col",
			"row-reverse": "flex-row-reverse",
			"col-reverse": "flex-col-reverse",
		},
		wrap: {
			true: "flex-wrap",
			false: "flex-nowrap",
		},
		align: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			baseline: "items-baseline",
			stretch: "items-stretch",
		},
		justify: {
			normal: "justify-normal",
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
			stretch: "justify-stretch",
		},
	},
	defaultVariants: {
		inline: false,
		wrap: true,
		direction: "row",
		justify: "start",
		align: "start",
	},
});

export const stack = cva({
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
		align: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			baseline: "items-baseline",
			stretch: "items-stretch",
		},
		justify: {
			normal: "justify-normal",
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
			stretch: "justify-stretch",
		},
	},
	defaultVariants: {
		inline: false,
		justify: "start",
		align: "start",
	},
});

export const hstack = compose(
	stack,
	cva({
		base: "flex-row",
	}),
);

export const vstack = compose(stack, cva({ base: "flex-col" }));

export const main = cva({
	base: "grid gap-x-4 gap-y-32 pt-4 md:grid-cols-4 lg:grid-cols-12",
});

export const subgrid = cva({
	base: "col-span-full grid grid-cols-subgrid",
});
