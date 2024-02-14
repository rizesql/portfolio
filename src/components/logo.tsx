import { Link, center, touchable } from "./ui";

import { appInfo } from "~/lib/app-info";
import { cx } from "~/lib/cx";

export function Logo() {
	return (
		<Link.Nav
			href="/"
			unstyled
			class={cx(touchable(), center(), "text-xl font-medium tracking-tight")}
		>
			{appInfo.alter}
		</Link.Nav>
	);
}
