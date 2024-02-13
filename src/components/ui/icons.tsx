import { cva } from "cva";
import { splitProps, type ComponentProps } from "solid-js";

import type { Icon as IconName } from "./icons/generated/names";
import href from "./icons/generated/sprite.svg?url";

import { cx } from "~/lib/cx";

const icon = cva({ base: "size-4" });

export function Icon(props: ComponentProps<"svg"> & { name: IconName }) {
	const [local, other] = splitProps(props, ["class", "name"]);

	return (
		<svg {...other} class={cx("inline self-center", icon({ class: local.class }))}>
			<use href={`${href}#${local.name}`} />
		</svg>
	);
}
