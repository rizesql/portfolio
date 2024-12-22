import type { CollectionEntry } from "astro:content";
import { splitProps, type ComponentProps } from "solid-js";

import { Interval } from "~/components/interval";
import { Icon, Link, center, hstack, touchable, vstack } from "~/components/ui";
import { cx } from "~/lib/cx";

type WorkCardProps = ComponentProps<"article"> &
	CollectionEntry<"experience">["data"] & { id: string };

export function WorkCard(props: WorkCardProps) {
	const [local, other] = splitProps(props, [
		"name",
		"period",
		"subtitle",
		"class",
		"id",
	]);

	return (
		<article
			class={cx(
				vstack(),
				"gap-2 py-2 lg:py-0 lg:grid lg:grid-rows-subgrid lg:row-span-full",
			)}
			{...other}
		>
			<div
				class={cx(
					hstack({
						align: "baseline",
						justify: "between",
						class: "md:flex-col xl:flex-row",
					}),
					"w-full gap-x-4 gap-y-2",
				)}
			>
				<h2 class="font-medium">{local.name}</h2>
				<Interval period={props.period} />
			</div>

			<p class="text-balance">{local.subtitle}</p>

			<Link.Nav
				href={`/work/${local.id}`}
				class={cx(hstack(), center(), touchable(), "group gap-2 justify-end")}
			>
				<span class="sr-only">{local.name}</span>
				<span>Read more</span>
				<Icon
					name="arrow-right"
					class="transition-transform group-hover:translate-x-1 touch:size-5"
				/>
			</Link.Nav>
		</article>
	);
}
