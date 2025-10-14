// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import basicSsl from "@vitejs/plugin-basic-ssl";
//import wasm from 'vite-plugin-wasm'

// https://astro.build/config
export default defineConfig({
  site: "https://www.variety.gifts",
  devToolbar: {
    enabled: false
  },
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    plugins: [basicSsl()],
  },
});
