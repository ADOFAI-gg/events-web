<script lang="ts">
	import CourseList from '$lib/course/components/course-list.svelte';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	const tabs = $derived.by(() => {
		return [
			{
				id: 'all',
				name: 'awc2026-qualifier-level-all'
			},
			{ id: 'a', name: 'awc2026-qualifier-level-a' },
			{ id: 'b', name: 'awc2026-qualifier-level-b' }
		];
	});

	const { params, data }: PageProps = $props();
</script>

<h1 class="text-4xl font-medium">
	<Localized id="awc2026-qualifier-title" />
</h1>

<div class="flex gap-4 mt-2">
	{#each tabs as tab (tab.id)}
		{@const active = params.level === tab.id}
		<a
			href="/awc2026/qualifier/{tab.id}"
			class="relative grow w-0 bg-gg-darkblue/20 rounded-lg font-medium contents-center text-center p-4"
		>
			<Localized id={tab.name} />
			{#if active}
				<div
					transition:fade={{ duration: 200 }}
					class="absolute bottom-0 left-0 w-full bg-gg-blue rounded-b-lg h-1"
				></div>
			{/if}
		</a>
	{/each}
</div>

<CourseList data={data.data} cutLinePosition={64} />
