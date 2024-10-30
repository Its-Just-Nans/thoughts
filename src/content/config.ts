import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
    if (!array.length) return array;
    const lowercaseItems = array.map((str) => str.toLowerCase());
    const distinctItems = new Set(lowercaseItems);
    return Array.from(distinctItems);
}

const post = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string().max(60),
            description: z.string().min(50).max(160).optional(),
            publishDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            updatedDate: z
                .string()
                .optional()
                .transform((str) => (str ? new Date(str) : undefined))
                .optional(),
            coverImage: z
                .object({
                    src: image(),
                    alt: z.string(),
                })
                .optional(),
            draft: z.boolean().default(false),
            tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
            ogImage: z.string().optional(),
            customSlug: z
                .string()
                .transform((str) => (str.endsWith("/") ? str : `${str}/`))
                .optional(),
            isWork: z.boolean().default(false).optional(),
            isDev: z.boolean().default(false).optional(),
            isSchool: z.boolean().default(false).optional(),
            isThought: z.boolean().default(false).optional(),
        }),
});

export const collections = { post };
