<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { PageProps } from './$types';
	import { fade } from 'svelte/transition';
	import CourseRecord from '../../components/course-record.svelte';
	import { createWindowVirtualizer } from '$lib/virtualizer.svelte';

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

	const records = $derived(data.records);
	const totalLevelCount = $derived(data.totalLevelCount);

	const virtualizer = $derived(
		createWindowVirtualizer({
			count: records.length,

			estimateSize: () => 60,
			overscan: 3
		})
	);

	let elements = $state<HTMLDivElement[]>([]);

	$effect(() => {
		elements.forEach((el) => virtualizer.measureElement(el));
	});

	const virtualItems = $derived(virtualizer.getVirtualItems());
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

<div class="mt-4 relative" style="height: {virtualizer.getTotalSize()}px;">
	<div
		style="transform: translateY({virtualItems[0]
			? virtualItems[0].start - virtualizer.options.scrollMargin
			: 0}px)"
		class="absolute top-0 left-0 w-full"
	>
		{#each virtualItems as item, i (item.index)}
			{@const record = records[item.index]}
			<div bind:this={elements[i]} data-index={item.index} class="relative">
				<CourseRecord {record} ordinal={item.index + 1} isMultiple={totalLevelCount > 1} />
				{#if item.index === 63}
					<div
						class="absolute z-50 bottom-0 left-0 w-full border-b-2 border-gg-yellow pointer-events-none select-none"
					>
						<div
							class="bg-gg-yellow text-black translate-y-1/2 inline-flex px-2 py-0.5 rounded-md text-sm font-medium absolute left-0 bottom-0"
						>
							<Localized id="cut-line" />
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
