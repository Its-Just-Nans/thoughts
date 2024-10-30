import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts() {
    return await getCollection("post", ({ data }) => {
        if (data.draft) {
            console.log(`Draft post found: ${data.title}`);
        }
        return import.meta.env.PROD ? data.draft !== true : true;
    });
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
    return posts.sort((a, b) => {
        const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
        const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
        return bDate - aDate;
    });
}
