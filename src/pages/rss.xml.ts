import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getAllPosts, sortMDByDate } from "../utils/posts";

export async function GET(context: APIContext) {
    const allPosts = await getAllPosts();
    const allPostsByDate = sortMDByDate(allPosts);
    return rss({
        title: "Thoughts of n4n5",
        description: "RSS feed for thoughts by n4n5",
        site: context.site || new URL("https://thoughts.n4n5.dev"),
        items: allPostsByDate.map((post) => ({
            title: post.data.title,
            pubDate: post.data.lastEdit || post.data.publishDate,
            link: `/${post.data.customSlug ?? post.slug}/`,
        })),
        customData: `<language>en-EN</language>`,
    });
}
