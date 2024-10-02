/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [        
			{
				/*
				mytheme: {
					"primary": "#fde047",
					"secondary": "#fbcfe8",
					"accent": "#a5f3fc",
				"neutral": "#4b5563",
				"base-100": "#fef9c3",
				"info": "#fecdd3",
				"success": "#a3e635",
				"warning": "#9f1239",
				"error": "#ff0000",
			}
			*/
		}, 'halloween', 'dark'],
		base: true,
		styled: true,
		utils: true,
		prefix: "",
		logs: true,
		themeRoot: ":root",
	},
}
