// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    ssr: {
      noExternal: ['zwitch', 'hast-util-to-html'],
    },
    resolve: {
      alias: {
        'zwitch': 'zwitch/index.js'
      }
    }
  }
});
