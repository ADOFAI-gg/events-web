<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { PageProps } from './$types';
	import { createWindowVirtualizer } from '$lib/virtualizer.svelte';
	import CourseRecord from '../components/course-record.svelte';

	const { data }: PageProps = $props();

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
	<Localized id="awc2026-course-title" />
</h1>

<div class="mt-4 relative" style="height: {virtualizer.getTotalSize()}px;">
	<div
		style="transform: translateY({virtualItems[0]
			? virtualItems[0].start - virtualizer.options.scrollMargin
			: 0}px)"
		class="absolute top-0 left-0 w-full"
	>
		{#each virtualItems as item, i (item.index)}
			{@const record = records[item.index]}
			<div bind:this={elements[i]} data-index={item.index}>
				<CourseRecord {record} ordinal={item.index + 1} isMultiple={totalLevelCount > 1} />
			</div>
		{/each}
	</div>
</div>
