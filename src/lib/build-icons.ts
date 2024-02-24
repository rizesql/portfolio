/* eslint-disable no-console */
import * as path from "node:path";

import fsExtra from "fs-extra";
import { glob } from "glob";

void main();
async function main() {
	const cwd = process.cwd();
	const inputDir = path.join(cwd, "src", "assets", "icons");
	const inputDirRelative = path.relative(cwd, inputDir);
	const outputDir = path.join(cwd, "src", "components", "ui", "icons", "generated");

	const files = glob
		.sync("**/*.svg", {
			cwd: inputDir,
		})
		.sort((a, b) => a.localeCompare(b));

	const shouldVerboseLog = process.argv.includes("--log=verbose");
	const logVerbose = shouldVerboseLog ? console.log : () => {};

	if (files.length === 0) {
		console.log(`No SVG files found in ${inputDirRelative}`);
		process.exit(0);
	}

	const typeOutputFilepath = path.join(outputDir, "names.ts");
	const currentTypes = await fsExtra.readFile(typeOutputFilepath, "utf8").catch(() => "");

	const iconNames = files.map((file) => iconName(file));

	const typesUpToDate = iconNames.every((name) => currentTypes.includes(name));

	if (typesUpToDate) {
		console.log(`Icons are up to date`);
		process.exit(0);
	}

	logVerbose(`Generating sprite for ${inputDirRelative}`);

	await fsExtra.emptyDir(outputDir);

	for (const file of files) {
		logVerbose("✅", file);
	}

	const typeOutputContent = generateTypes({
		names: files.map((file) => iconName(file)).map((name) => JSON.stringify(name)),
	});

	await writeIfChanged(typeOutputFilepath, typeOutputContent);

	logVerbose(`Manifest saved to ${path.relative(cwd, typeOutputFilepath)}`);

	await writeIfChanged(
		path.join(outputDir, "README.md"),
		[
			"# Icons",
			"",
			"This directory contains SVG icons that are used by the app.",
			"",
			"Everything in this directory is generated by `npm run build:icons`.",
		].join("\n"),
	);
	console.log(`Generated ${files.length} icons`);
}

function iconName(file: string) {
	return file.replace(/\.svg$/, "");
}

function generateTypes({ names }: { names: string[] }) {
	return [
		`// This file is generated by npm run build:icons`,
		"",
		`export type Icon =`,
		...names.map((name) => `\t| ${name}`),
		"",
	].join("\n");
}

/**
 * Each write can trigger dev server reloads, so we only write if the content has changed
 */
async function writeIfChanged(filepath: string, newContent: string) {
	const currentContent = await fsExtra.readFile(filepath, "utf8").catch(() => "");
	if (currentContent === newContent) return;
	await fsExtra.writeFile(filepath, newContent, "utf8");
}
