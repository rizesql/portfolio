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
		base: "top-5 col-[4/span_2] h-min font-medium lg:sticky",
	}),
	sideContent: cva({ base: "col-[7/-1] text-4xl font-medium [text-wrap:balance]" }),
};

function Root(props: ComponentProps<"section"> & { first?: boolean }) {
	const [local, other] = splitProps(props, ["class", "first"]);

	return (
		<section class={section.root(local)} {...other}>
			{props.children}
			{props.first ? null : <div class="col-span-full hidden h-8 lg:block" />}
		</section>
	);
}

function Header(props: ComponentProps<"header">) {
	const [local, other] = splitProps(props, ["class"]);
	return (
		<header class={section.header(local)} {...other}>
			{props.children}
		</header>
	);
}

function SideContent(props: ComponentProps<"div">) {
	const [local, other] = splitProps(props, ["class"]);

	return (
		<div class={section.sideContent(local)} {...other}>
			{props.children}
		</div>
	);
}

export const Section = { Root, Header, SideContent };
