import type { MarkdownHeading } from "astro";
import { For, type Signal, createContext, createSignal, useContext } from "solid-js";
import { cx } from "~/lib/cx";
import { Link, touchable, vstack } from "./ui";

interface TocItem extends MarkdownHeading {
	children: TocItem[];
}

export function generateToC(
	headings: MarkdownHeading[],
  options: { minHeadingLevel: number, maxHeadingLevel: number }
) {
	const headings_ = headings.filter(h => h.depth >= options.minHeadingLevel && h.depth <= options.maxHeadingLevel);
	const toc: Array<TocItem> = [];

	for (const heading of headings_) {
	   injectChild(toc, { ...heading, children: [] });
	}

	return toc;
}

function injectChild(items: TocItem[], item: TocItem): void {
	const lastItem = items.at(-1);
	if (!lastItem || lastItem.depth >= item.depth) {
		items.push(item);
	} else {
		injectChild(lastItem.children, item);
	}
}

const ToCContext = createContext<Signal<string | undefined>>();
function useToC() {
  const value = useContext(ToCContext);
  if (value === undefined) {
    throw new Error("useToC must be used within a ToCContext.Provider");
  }
  return value;
}

export function TableOfContents(props: { headings: Array<MarkdownHeading>}){
  const currentItem = createSignal<string>();
  const items = generateToC(props.headings, {minHeadingLevel: 2, maxHeadingLevel: 3 })

  return (
    <nav>
      <ToCContext.Provider value={currentItem}>
        <Items items={items} depth={0} />
      </ToCContext.Provider>
    </nav>
  );
}

function Items(props: { items: Array<TocItem>, depth: number }) {
  const [currentItem, setCurrentItem] = useToC();

  return (
    <ul class={cx(vstack(), "lg:gap-2")}>
      <For each={props.items}>
        {h => (
          <li>
            <Link.Nav
              href={`#${h.slug}`}
              unstyled
              class={cx(touchable(), "text-sm font-zed-mono", currentItem() === h.slug && "text-brand")}
              style={{
                "padding-left": `${props.depth * 2}rem`,
              }}
              onClick={() => setCurrentItem(h.slug)}
            >
              /{h.text}
            </Link.Nav>
            {h.children.length > 0 && (<Items items={h.children} depth={props.depth + 1} />)}
          </li>
        )}
      </For>
    </ul>
  );
}
