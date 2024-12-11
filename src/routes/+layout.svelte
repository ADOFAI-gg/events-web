<script lang="ts">
	import type { Snippet } from 'svelte'

	import '@adofai-gg/ui/globals.scss'

	import '@fontsource/ibm-plex-sans-kr/300.css'
	import '@fontsource/ibm-plex-sans-kr/400.css'
	import '@fontsource/ibm-plex-sans-kr/500.css'
	import '@fontsource/ibm-plex-sans-kr/600.css'
	import '@fontsource/ibm-plex-sans-kr/700.css'

	import { Nav, setGlobalContext } from '@adofai-gg/ui'
	import { readable } from 'svelte/store'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()

	setGlobalContext({
		language: readable('en'),
		links: [],
		setLanguage: () => {},
		urls: {
			main: '/',
			signIn: '/',
			signUp: '/'
		}
	})
</script>

<Nav user={null} minimal />

{@render children?.()}
