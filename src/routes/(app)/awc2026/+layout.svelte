<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<svelte:head>
	<title>AWC 2026</title>
</svelte:head>

<div class="flex gap-2">
	{#snippet link(base: string, label: string)}
		<a
			href={base}
			class="{page.url.pathname.startsWith(base)
				? 'text-white'
				: 'text-white/60'} hover:text-white transition-colors"
		>
			<Localized id={label} />
		</a>
	{/snippet}

	{@render link('/awc2026/qualifier', 'awc2026-tab-qualifier')}
	{@render link('/awc2026/course', 'awc2026-tab-course')}
</div>

{@render children()}
