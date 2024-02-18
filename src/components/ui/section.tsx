export * as Section from "./section";

import { splitProps, type ComponentProps } from "solid-js";

import { cva } from "~/lib/cx";

export const section = {
	root: cva({
		base: "relative col-span-full grid grid-cols-subgrid gap-y-32",
		variants: {
			first: {
				true: "hidden lg:grid",
				false: "mt-32 lg:mt-auto",
			},
		},
	}),
	header: cva({
		base: "top-5 col-start-1 h-min items-end font-medium lg:sticky lg:col-[4/span_2] lg:text-white lg:mix-blend-exclusion",
	}),
	sideContent: cva({
		base: "col-span-full col-start-2 text-4xl font-medium [text-wrap:balance] lg:col-start-7",
	}),
};

export function Root(props: ComponentProps<"section"> & { first?: boolean }) {
	const [local, other] = splitProps(props, ["class", "first"]);

	return (
		<section class={section.root(local)} {...other}>
			{props.children}
			{props.first ? null : <div class="col-span-full hidden h-8 lg:block" />}
		</section>
	);
}

export function Header(props: ComponentProps<"header">) {
	const [local, other] = splitProps(props, ["class"]);
	return (
		<header class={section.header(local)} {...other}>
			{props.children}
		</header>
	);
}

export function SideContent(props: ComponentProps<"div">) {
	const [local, other] = splitProps(props, ["class"]);

	return (
		<div class={section.sideContent(local)} {...other}>
			{props.children}
		</div>
	);
}
