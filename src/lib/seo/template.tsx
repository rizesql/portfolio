import * as fs from "node:fs/promises";
import * as path from "node:path";

import { renderToSvg } from "solid-satori";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og";

import type { Content } from "~/content/base-content";

type Props = Content & { background: string; foreground: string };

function Template(props: Props) {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				"flex-direction": "column",
				"align-items": "flex-start",
				"justify-content": "center",
				padding: "10vh 10vw",
				color: props.foreground,
				background: props.background,
			}}
		>
			<h1 class="text-6xl">{props.name}</h1>
			<p class="text-2xl">{props.subtitle}</p>
		</div>
	);
}

export async function OG(props: Props) {
	const fontData = (
		await fs.readFile(path.join(process.cwd(), "public", "fonts", "overused-grotesk.ttf"))
	).buffer;

	const svg = await renderToSvg(() => <Template {...props} />, {
		width: OG_IMAGE_WIDTH,
		height: OG_IMAGE_HEIGHT,
		fonts: [{ name: "Overused Grotesk", data: fontData, style: "normal" }],
	});

	return new Response(svg, { headers: { "content-type": "image/svg+xml" } });
}
