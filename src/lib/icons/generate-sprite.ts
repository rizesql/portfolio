import { glob } from "glob";
import { parse } from "node-html-parser";
import * as fs from "node:fs/promises";

const inputDir = "src/components/ui/icons";
const output = "public/icons";

const files = await glob(`${inputDir}/generated/*.svg`).then((f) =>
	f.sort((lhs, rhs) => lhs.localeCompare(rhs)),
);

if (files.length === 0) {
	console.log(`No SVG files found in ${inputDir}`);
	process.exit(0);
}

const types = `${output}/sprite.svg`;

console.log(`Generating icons sprite for ${inputDir}`);

for (const file of files) {
	console.log("✅", file);
}

const outputContent = await generateSprite(files);

await fs.writeFile(types, outputContent);

console.log(`Generated ${files.length} icons`);

function iconName(file: string) {
	return file.replace(/\.svg$/, "").replace(`${inputDir}/generated/`, "");
}

async function generateSprite(files: string[]) {
	let symbols = "";

	for (const file of files) {
		let content = await fs.readFile(file, "utf-8");

		const root = parse(content);
		const svg = root.querySelector("svg");
		if (!svg) {
			throw new Error("No SVG element found");
		}

		svg.removeAttribute("width");
		svg.removeAttribute("height");

		content = root.toString();

		const id = iconName(file);
		content = content
			.replace(/id="[^"]+"/, "") // Remove any existing id
			.replace("<svg", `<symbol id="${id}"`) // Change <svg> to <symbol>
			.replace("</svg>", "</symbol>");

		symbols += `${content}`;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols}</svg>`;
}
