import { format } from "date-fns";
import { Show } from "solid-js";

import { hstack } from "./ui";

import { cx } from "~/lib/cx";
import { isPeriod, type Period } from "~/lib/period";

export function Interval(props: { period: Period | number }) {
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
