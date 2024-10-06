import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
    const blog = await getCollection("post");
    return rss({
        title: "Thoughts of n4n5",
        description: "RSS feed for thoughts by n4n5",
        site: context.site || new URL("https://thoughts.n4n5.dev"),
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishDate,
            link: `/${post.data.customSlug ?? post.slug}/`,
        })),
        customData: `<language>en-EN</language>`,
    });
}
