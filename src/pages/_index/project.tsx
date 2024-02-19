import { splitProps, type ComponentProps } from "solid-js";

import { Link } from "~/components/ui";
import { cx } from "~/lib/cx";

export function Project(
	props: ComponentProps<"article"> & { name: string; href: string; color: string },
) {
	const [local, other] = splitProps(props, ["class", "name", "href", "color"]);

	return (
		<article class={cx(local.class)} {...other}>
			<h2 class="text-2xl font-medium">
				<Link.Nav href={local.href} unstyled>
					{local.name}
				</Link.Nav>
			</h2>

			<div class="h-full" style={{ background: local.color }} />
		</article>
	);
}
