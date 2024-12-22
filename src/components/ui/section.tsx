export * as Section from "./section";

import { For, Show, splitProps, type ComponentProps, type ParentProps } from "solid-js";

import { Link } from "./link";
import { touchable } from "./touchable";

import { cva, cx } from "~/lib/cx";

export const section = {
	root: cva({
		base: "relative col-span-full mt-32 grid grid-cols-subgrid gap-y-32 lg:mt-auto",
	}),
	first: cva({ base: "hidden lg:grid" }),
	header: cva({
		base: "top-5 col-start-1 h-min items-end font-medium mix-blend-exclusion invert-[var(--invert-nav)] lg:sticky lg:col-[4/span_2]",
	}),
	sideContent: cva({
		base: "col-span-full col-start-2 text-balance text-3xl lg:col-start-7 font-medium",
	}),
};

export function Root(props: ComponentProps<"section"> & { bottomSpacing?: boolean }) {
	const [local, other] = splitProps(props, ["class", "bottomSpacing"]);

	return (
		<section class={section.root(local)} {...other}>
			{props.children}

			<Show when={local.bottomSpacing ?? true}>
				<div class="col-span-full hidden h-1 lg:block" />
			</Show>
		</section>
	);
}

export function Header(props: ComponentProps<"header">) {
	const [local, other] = splitProps(props, ["class"]);
	return (
		<header
			class="top-5 col-start-1 h-min items-end font-medium mix-blend-exclusion invert-[var(--invert-nav)] lg:sticky lg:col-[4/span_2]"
			{...other}
		>
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

export function First(
	props: ParentProps<{
		header: { name: string; subtitle: string };
		links: ReadonlyArray<{ href: string; label: string }>;
		class?: string;
	}>,
) {
	return (
		<Root bottomSpacing={false} class={section.first({ class: props.class })}>
			<Header class="text-sm">
				<h2>{props.header.name}</h2>
				<p class="font-normal">{props.header.subtitle}</p>
			</Header>

			<SideContent class="col-[7/span_4] gap-0 text-sm touch:flex touch:gap-4">
				<For each={props.links}>
					{(social) => (
						<Link.External href={social.href} class={cx(touchable(), "[&>svg]:size-4")}>
							{social.label}
						</Link.External>
					)}
				</For>
			</SideContent>

			{props.children}
		</Root>
	);
}
