import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import { thisWebsite } from "./src/utils/constants";
import { downloadScript } from "./src/utils/utils";

import mdx from "@astrojs/mdx";

await downloadScript({
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css": "leaflet.css",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js": "leaflet.js",
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png": "images/marker-icon.png",
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png": "images/marker-shadow.png",
});

// https://astro.build/config
export default defineConfig({
    site: thisWebsite,
    integrations: [
        mdx({
            rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
        }),
        sitemap({
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date(),
        }),
    ],
    devToolbar: {
        enabled: false,
    },
});
