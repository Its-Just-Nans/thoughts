import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getAllPosts, sortMDByDate } from "../utils/posts";

export async function GET(context: APIContext) {
    const allPosts = await getAllPosts();
    const allPostsByDate = sortMDByDate(allPosts, true);
    const customData = {
        language: "en-EN",
        lastBuildDate: new Date().toUTCString(),
        generator: context.generator ?? "Astro",
        copyright: `Copyright ${new Date().getFullYear()} n4n5`,
    };
    const objToXml = (data: object) =>
        Object.entries(data).reduce((acc, [key, value]) => {
            acc += `<${key}>${value}</${key}>\n`;
            return acc;
        }, "");

    return rss({
        title: "Thoughts of n4n5",
        description: "RSS feed for thoughts by n4n5",
        site: context.site || new URL("https://thoughts.n4n5.dev"),
        items: allPostsByDate.map((post) => ({
            title: post.data.title,
            pubDate: post.data.updatedDate ?? post.data.publishDate,
            link: `/${post.data.customSlug ?? post.slug}/`,
            ...(post.data.updatedDate && {
                customData: objToXml({
                    updatedDate: post.data.updatedDate.toISOString(),
                    publishDate: post.data.publishDate.toISOString(),
                }),
            }),
        })),
        customData: objToXml(customData),
    });
}
