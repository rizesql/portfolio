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
type CollectionData = Pick<CollectionEntry<Collection>, "data" | "collection">;

export const getStaticPaths = (async () => {
	const data = await Promise.all(collections.map((col) => getCollection(col)));

	return (
		data
			.flatMap((d) => d)
			// .reduce((curr, acc) => [...acc, ...curr], [])
			.map((entry) => ({
				params: { id: entry.slug },
				props: {
					id: entry.id,
					slug: entry.slug,
					data: entry.data,
					collection: entry.collection,
				},
			}))
	);
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async ({ props }) =>
	OG({
		...props.data,
		background: background(props),
		foreground: foreground(props),
	});

function isProject(self: CollectionData): self is CollectionEntry<"projects"> {
	return self.collection === "projects";
}

function background(data: CollectionData) {
	if (isProject(data)) {
		return data.data.color;
	}

	const opts = {
		articles: "#1e1e2c",
		experience: "#e7e3de",
	} satisfies Record<UncustomizedCollection, string>;

	return opts[data.collection as UncustomizedCollection];
}

function foreground(data: CollectionData) {
	if (isProject(data)) {
		return data.data.foreground;
	}

	const opts = {
		articles: "#a6adc8",
		experience: "#313130",
	} satisfies Record<UncustomizedCollection, string>;

	return opts[data.collection as UncustomizedCollection];
}
