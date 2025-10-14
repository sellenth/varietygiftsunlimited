// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.variety.gifts",
  output: 'server',
  adapter: vercel({}),
  integrations: [react(), tailwind(), sitemap()],
});
