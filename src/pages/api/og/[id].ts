import type {
	APIRoute,
	GetStaticPaths,
	InferGetStaticParamsType,
	InferGetStaticPropsType,
} from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

import { OG } from "~/lib/seo/template";

const collections = ["articles", "projects", "experience"] as const;
type Collection = (typeof collections)[number];
type UncustomizedCollection = Exclude<Collection, "projects">;

export const getStaticPaths = (async () => {
	const data = await Promise.all(collections.map((col) => getCollection(col)));

	return data
		.reduce((curr, acc) => [...acc, ...curr], [])
		.map((entry) => ({
			params: { id: entry.slug },
			props: {
				id: entry.id,
				slug: entry.slug,
				data: entry.data,
				collection: entry.collection,
			},
		}));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

const foreground = (collection: UncustomizedCollection) => {
	const opts = {
		articles: "#a6adc8",
		experience: "#313130",
	} satisfies Record<UncustomizedCollection, string>;

	return opts[collection];
};

const background = (collection: UncustomizedCollection) => {
	const opts = {
		articles: "#1e1e2c",
		experience: "#e7e3de",
	} satisfies Record<UncustomizedCollection, string>;

	return opts[collection];
};

export const GET: APIRoute<Props, Params> = async ({ props }) => {
	if (props.collection === "projects") {
		const data = props.data as CollectionEntry<"projects">["data"];

		return OG({ ...data, background: data.color });
	}

	return OG({
		...props.data,
		foreground: foreground(props.collection),
		background: background(props.collection),
	});
};
