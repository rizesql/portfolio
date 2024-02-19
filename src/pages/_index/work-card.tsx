import { format } from "date-fns";
import { Show, splitProps, type ComponentProps } from "solid-js";
import { z } from "zod";

import { Icon, Link, center, hstack, touchable, vstack } from "~/components/ui";
import { cx } from "~/lib/cx";

export type WorkCardProps = ComponentProps<"article"> & {
	name: string;
	/**
	 * Represents either a period between two dates in format `year-month`, or just a year.
	 *
	 * @example
	 *
	 * ```tsx
	 * const period: Period = {
	 *  start: new Date("2023-02"),
	 *  end: new Date("2023-05")
	 * };
	 * const year: Period = 2023;
	 * ```
	 */
	period: Period | number;
	subtitle: string;
};

export function WorkCard(props: WorkCardProps) {
	const [local, other] = splitProps(props, ["name", "period", "subtitle", "class"]);

	return (
		<article class={cx(vstack(), "gap-2 py-2 lg:py-0", local.class)} {...other}>
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
				href="/work/upriver-technologies"
				class={cx(hstack(), center(), touchable(), "group gap-2")}
			>
				<span>Read more</span>
				<Icon
					name="arrow-right"
					class="transition-transform group-hover:translate-x-1 touch:size-5"
				/>
			</Link.Nav>
		</article>
	);
}

function Interval(props: { period: Period | number }) {
	return (
		<Show
			when={isPeriod(props.period) ? props.period : null}
			fallback={
				<time class="text-sm" datetime={`${props.period as number}`}>
					{props.period as number}
				</time>
			}
		>
			{(period) => (
				<span class={cx(hstack(), "gap-1 text-sm")}>
					<time datetime={format(period().start, "yyyy-MM")}>
						{format(period().start, "MM.yyyy")}
					</time>
					<span>-</span>
					<time datetime={format(period().end, "yyyy-MM")}>
						{format(period().end, "MM.yyyy")}
					</time>
				</span>
			)}
		</Show>
	);
}

const period = z.object({
	start: z.date(),
	end: z.date(),
});

type Period = z.infer<typeof period>;

const isPeriod = (value: unknown): value is Period => {
	return period.safeParse(value).success;
};
