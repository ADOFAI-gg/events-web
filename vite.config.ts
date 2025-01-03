import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/awc2025': {
				target: 'https://bot.adofai.gg/awc2025',
				rewrite: (path) => path.replace(/^\/api\/awc2025/g, ''),
				changeOrigin: true
			}
		}
	}
})
