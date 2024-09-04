import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  base: import.meta.env.DEV ? "." : "/thoughts",
  integrations: [mdx()],
});