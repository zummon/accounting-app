import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from "vite"
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
	plugins: [
		svelte(),
		viteSingleFile({
			removeViteModuleLoader: true
		}),
	],
	build: {
		target: 'es2019',
	},
});
