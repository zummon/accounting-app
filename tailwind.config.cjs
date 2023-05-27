module.exports = {
	content: ["./src/**/*.{html,js,jsx,svelte,ts,tsx,vue}", "./index.html"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
