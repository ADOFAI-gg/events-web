<script lang="ts">
	import '../app.css';
	import '$lib';
	import favicon from '$lib/assets/favicon.png';

	import { PersistedState } from 'runed';
	import {
		Scaffolding,
		Nav,
		type GlobalContext,
		libLanguageNames,
		setGlobalContext,
		Footer
	} from '@adofai-gg/ui';
	import { initFluentContext, createSvelteFluent } from '@nubolab-ffwd/svelte-fluent';
	import { createBundles, negotiateLanguages } from '@adofai-gg/ui';

	import { availableLanguages, translationResources } from '$lib/localization';
	import { navigating } from '$app/state';

	import { BProgress } from '@bprogress/core';

	let { children } = $props();

	$effect(() => {
		if (navigating.to) BProgress.start();
		else BProgress.done();
	});

	const globalContext = $state<GlobalContext>({
		languageNames: libLanguageNames,
		currentLanguage: '',
		availableLanguages
	});

	const lang = new PersistedState(
		'lang',
		negotiateLanguages(
			localStorage.lang ? [localStorage.lang] : navigator.languages,
			availableLanguages,
			{ defaultLocale: 'ko' }
		)[0]
	);

	$effect(() => {
		globalContext.currentLanguage = lang.current;
	});

	$effect(() => {
		lang.current = globalContext.currentLanguage;
	});

	setGlobalContext(globalContext);

	initFluentContext(() =>
		createSvelteFluent(
			createBundles(
				translationResources,
				negotiateLanguages(
					localStorage.lang ? [localStorage.lang] : navigator.languages,
					availableLanguages,
					{ defaultLocale: 'ko' }
				)
			)
		)
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Scaffolding>
	{#snippet nav()}
		<Nav.Root
			links={[
				{
					href: '/awc2025',
					title: 'AWC 2025'
				}
			]}
		></Nav.Root>
	{/snippet}

	{#snippet content()}
		{@render children()}
	{/snippet}

	{#snippet footer()}
		<Footer />
	{/snippet}
</Scaffolding>
