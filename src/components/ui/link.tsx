export * as Link from "./link";

import { Link as BaseLink } from "@kobalte/core";
import { splitProps } from "solid-js";

import { Icon } from "./icons";
import { hstack } from "./layout";

import { cva, extend } from "~/lib/cx";

const root = cva({
	base: "group",
	variants: {
		unstyled: {
			true: null,
			false: "font-medium underline",
		},
	},
	defaultVariants: {
		unstyled: false,
	},
});

export const link = {
	root,
	nav: extend(root, "flex"),
	external: {
		root: extend(root, [hstack({ align: "center" }), "gap-1"]),
		icon: cva({
			base: "size-5",
			variants: {
				unstyled: { true: null, false: "transition-transform group-hover:rotate-45" },
			},
			defaultVariants: {
				unstyled: false,
			},
		}),
	},
} as const;

export function Nav(props: BaseLink.LinkRootProps & { unstyled?: boolean }) {
	const [local, others] = splitProps(props, ["class", "unstyled"]);

	return (
		<BaseLink.Root data-astro-prefetch class={link.nav(local)} {...others}>
			{props.children}
		</BaseLink.Root>
	);
}

export function External(props: BaseLink.LinkRootProps & { unstyled?: boolean }) {
	const [local, others] = splitProps(props, ["class", "unstyled"]);

	return (
		<BaseLink.Root
			target="_blank"
			referrerPolicy="no-referrer"
			class={link.external.root(local)}
			{...others}
		>
			{props.children}
			<Icon
				name="arrow-top-right"
				class={link.external.icon({ unstyled: local.unstyled })}
			/>
		</BaseLink.Root>
	);
}
