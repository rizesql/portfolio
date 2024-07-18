import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og";
import { ImageResponse, fetchFont, html } from "og-img";

import type { Content } from "~/content/base-content";

type Props = Content & { background: string; foreground: string };

export async function OG(props: Props) {
	return new ImageResponse(
		html`<div
			tw="h-full w-full flex flex-col items-start content-center"
			style="padding: 10vh 10vw; background: ${props.background}; color: ${props.foreground}"
		>
			<h1 tw="text-6xl">${props.name}</h1>
			<p tw="text-2xl">${props.subtitle}</p>
		</div>`,
		{
			width: OG_IMAGE_WIDTH,
			height: OG_IMAGE_HEIGHT,
			fonts: [
				{
					name: "Overused Grotesk",
					data: await fetchFont(`${import.meta.env.SITE}/fonts/overused-grotesk.ttf`),
					style: "normal",
				},
			],
		},
	);
}
