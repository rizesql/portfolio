import { cva } from "cva";
import { splitProps, type ComponentProps } from "solid-js";

import type { Icon as IconName } from "./icons/generated/names";

import { cx } from "~/lib/cx";
import { env } from "~/lib/env";

const icon = cva({ base: "size-4" });

export function Icon(props: ComponentProps<"svg"> & { name: IconName }) {
	const [local, other] = splitProps(props, ["class", "name"]);

	return (
		<svg class={cx("inline self-center", icon({ class: local.class }))} {...other}>
			<use href={`${env.BASE_URL}/assets/images/sprite.svg#${props.name}`} />
		</svg>
	);
}
