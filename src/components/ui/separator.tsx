import { Separator as BaseSeparator } from "@kobalte/core";
import { splitProps } from "solid-js";

import { cva, type VariantProps } from "~/lib/cx";

export const separator = cva({
	base: "shrink-0 border-foreground-subtle bg-foreground-subtle",
	variants: {
		orientation: {
			horizontal: "h-px w-full",
			vertical: "h-full w-px",
		},
		fullScreen: {
			true: null,
			false: null,
		},
	},
	compoundVariants: [
		{ orientation: "horizontal", fullScreen: true, class: "-mx-4 w-screen lg:-m-6" },
		{ orientation: "vertical", fullScreen: true, class: "h-screen" },
	],
	defaultVariants: {
		orientation: "horizontal",
		fullScreen: false,
	},
});

export function Separator(
	props: typeof BaseSeparator.SeparatorRootProps & VariantProps<typeof separator>,
) {
	const [local, other] = splitProps(props, ["class", "orientation", "fullScreen"]);
	return <BaseSeparator.Root class={separator(local)} {...other} />;
}
