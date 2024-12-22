import { Picture } from "astro:assets";
import { Show, splitProps, type ComponentProps } from "solid-js";

import { Link } from "~/components/ui";
import { cx } from "~/lib/cx";

export function Project(
	props: ComponentProps<"article"> & { name: string; href: string; color: string, image?: unknown },
) {
	const [local, other] = splitProps(props, ["class", "name", "href", "color", "image"]);

  return (
    <article class={cx(local.class)} {...other}>
      <h2 class="text-2xl font-medium">
        <Link.Nav href={local.href} unstyled>
          {local.name}
        </Link.Nav>
      </h2>

      <Show when={local.image}>
        {image => (
          <Picture
            src={image}
            alt=""
            widths={[240, 540, 720, 960, 1024, image.width]}
            formats={["avif", "webp"]}
            loading="eager"
            style="height: 100%; width: 100%; object-fit: cover;"
          />
        )}
      </Show>
      // <div class="h-full" style={{ background: local.color }} />
    </article>
  );
}
