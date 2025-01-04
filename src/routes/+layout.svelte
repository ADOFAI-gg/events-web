<script lang="ts">
	import type { Snippet } from 'svelte'

	import '$lib/index'
	import '@adofai-gg/ui/globals.scss'
	import 'nprogress/nprogress.css'
	import '../global.scss'

	import * as NProgress from 'nprogress'

	import {
		availableLanguages,
		Menu,
		MenuRadioGroup,
		MenuRadioItem,
		getLangCode,
		IconProvider,
		Nav,
		setGlobalContext,
		Icon
	} from '@adofai-gg/ui'
	import { writable } from 'svelte/store'
	import { navigating } from '$app/stores'
	import MeltComponent from '$lib/components/MeltComponent.svelte'

	interface Props {
		children?: Snippet
	}

	const { children }: Props = $props()
	const lang = writable(getLangCode(localStorage.language || navigator.language))

	const setLanguage = (l: string) => {
		lang.set(l)
		localStorage.language = l
	}

	setGlobalContext({
		language: lang,
		links: [],
		setLanguage,
		urls: {
			main: '/',
			signIn: '/',
			signUp: '/'
		}
	})

	$effect(() => {
		if ($navigating) {
			NProgress.start()
		} else {
			NProgress.done()
		}
	})
</script>

<Nav user={null} minimal>
	{#snippet rightSlot()}
		<Menu>
			{#snippet button({ trigger })}
				<MeltComponent meltElement={trigger} element="button" props={{}}>
					<Icon alt="language" icon="globe" size={24} />
				</MeltComponent>
			{/snippet}

			<MenuRadioGroup
				value={$lang}
				onchange={(v) => {
					if (!v) return
					setLanguage(v)
				}}
			>
				{#each availableLanguages as language}
					<MenuRadioItem value={language.code}>
						{language.name}
					</MenuRadioItem>
				{/each}
			</MenuRadioGroup>
		</Menu>
	{/snippet}
</Nav>

{@render children?.()}

<IconProvider />
