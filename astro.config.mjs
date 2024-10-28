// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
//import wasm from 'vite-plugin-wasm'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    //plugins: [basicSsl(), wasm()],
    plugins: [basicSsl()],
  },
});
