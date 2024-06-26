import { glob } from "glob";
import * as fs from "node:fs/promises";

const inputDir = "src/components/ui/icons/generated";
const output = "src/components/ui/icons/generated";

const files = await glob(`${inputDir}/**/*.svg`).then((f) =>
	f.sort((lhs, rhs) => lhs.localeCompare(rhs)),
);

if (files.length === 0) {
	console.log(`No SVG files found in ${inputDir}`);
	process.exit(0);
}

const types = `${output}/types.ts`;

console.log(`Generating icon types for ${inputDir}`);

for (const file of files) {
	console.log("✅", file);
}

const outputContent = generateTypes({
	names: files.map(iconName).map((name) => JSON.stringify(name)),
});

await fs.writeFile(types, outputContent);

console.log(`Generated types for ${files.length} icons`);

function iconName(file: string) {
	return file.replace(/\.svg$/, "").replace(`${inputDir}/`, "");
}

function generateTypes({ names }: { names: string[] }) {
	return [
		"// This file is generated by npm run build:icons",
		"",
		"export type Icon =",
		...names.map((name) => `\t| ${name}`),
		"",
	].join("\n");
}
