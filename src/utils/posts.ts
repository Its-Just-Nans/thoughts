import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
    const slugs = new Set();
    return await getCollection("post", ({ data }) => {
        if (data.customSlug) {
            if (slugs.has(data.customSlug)) {
                throw new Error(`Duplicate slug found: ${data.customSlug} in ${data.title}`);
            }
            slugs.add(data.customSlug);
        }
        if (import.meta.env.DEV && data.draft) {
            console.log(`Draft post found: ${data.title}`);
        }
        if (import.meta.env.DEV && data.hidden) {
            console.log(`Hidden post found: ${data.title}`);
        }
        return import.meta.env.PROD ? data.draft !== true : true;
    });
}

export const filterHidden = (
    posts: CollectionEntry<"post">[],
    value = false
): CollectionEntry<"post">[] => {
    return posts.filter((post) => post.data.hidden == value);
};

export function sortMDByDate(posts: CollectionEntry<"post">[], useUpdatedDate = false): CollectionEntry<"post">[] {
    return posts.sort((a, b) => {
        const aDate = new Date(
            useUpdatedDate ? (a.data.updatedDate ?? a.data.publishDate) : a.data.publishDate
        ).valueOf();
        const bDate = new Date(
            useUpdatedDate ? (b.data.updatedDate ?? b.data.publishDate) : b.data.publishDate
        ).valueOf();
        return bDate - aDate;
    });
}
