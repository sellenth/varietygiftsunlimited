/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f7ff2e",

          "secondary": "#fbcfe8",

          "accent": "#28158e",

          "neutral": "#ffffff",

          "base-100": "#a07af7",

          "info": "#fecdd3",

          "success": "#a3e635",

          "warning": "#9f1239",

          "error": "#ff0000",
          'accent-content': "#f9cfd5",
        },
      },
      "leaf-blue",
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
