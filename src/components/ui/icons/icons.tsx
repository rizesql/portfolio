import { cva } from "cva";
import { splitProps, type ComponentProps } from "solid-js";

import type { Icon as IconName } from "./generated/types";

import { cx } from "~/lib/cx";

const icon = cva({ base: "size-4" });

export function Icon(props: ComponentProps<"svg"> & { name: IconName }) {
	const [local, other] = splitProps(props, ["class", "name"]);

	return (
		<svg class={cx("inline self-center", icon({ class: local.class }))} {...other}>
			<use href={`/icons/sprite.svg#${props.name}`} />
		</svg>
	);
}
