import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.ftl': 'text'
			}
		}
	},
	ssr: {
		noExternal: ['@nubolab-ffwd/svelte-fluent', '@adofai-gg/ui']
	},
	server: {
		proxy: {
			'/api/course/': {
				target: 'https://course.adofai.gg',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/course\//, '/api/')
			}
		}
	}
});
